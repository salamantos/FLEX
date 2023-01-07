import json

import requests

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
            requests.post(
                # 'http://84.201.157.77:7001/api_private/data/',
                'http://lc-dev.voxastro.org/api_private/data/',
                json=full_result[i:i + BATCH_SIZE],
            )
            print(f'Uploaded [{i}:{i + BATCH_SIZE}) of {len(full_result)}')
            i += BATCH_SIZE


for algo_name in ALGOS.keys():
    upload(algo_name)
