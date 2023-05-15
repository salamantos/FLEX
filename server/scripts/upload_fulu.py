import json

import requests

HOST = 'http://lc-dev.voxastro.org'
#HOST = 'http://localhost:7001'
ALGOS = {
    'GP': {
        'suffix': 'GP',
        'enabled': True
    },
    'BNN': {
        'suffix': 'BNN',
        'enabled': True
    },
    'NN_sklearn': {
        'suffix': 'NN_sklearn',
        'enabled': True
    },
    'NN_pytorch': {
        'suffix': 'NN_pytorch',
        'enabled': True
    },
    'NF': {
        'suffix': 'NF',
        'enabled': True
    },
}
BATCH_SIZE = 100


def upload(algo):
    if not ALGOS[algo]['enabled']:
        print(f'Algo {algo} disabled')
        return
    print(f'Uploading {algo}')

    with open(f'processed/fulu/{ALGOS[algo]["suffix"]}.json', 'r') as f:
        full_result = json.load(f)
        i = 0
        while i < len(full_result):
            response = requests.post(
                f'{HOST}/api_private/data/',
                json=full_result[i:i + BATCH_SIZE],
            )
            if not response.ok:
                print(response.status_code, response.json())
                raise Exception
            print(f'Uploaded [{i}:{i + BATCH_SIZE}) of {len(full_result)}')
            i += BATCH_SIZE


for algo_name in ALGOS.keys():
    upload(algo_name)
