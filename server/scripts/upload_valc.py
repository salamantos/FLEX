import json

import requests

BATCH_SIZE = 10


def upload():
    with open('processed/valc/valc.json', 'r') as f:
        result_list = json.load(f)
        i = 0
        while i < len(result_list):
            requests.post(
                # 'http://84.201.157.77:7001/api_private/data-valc/',
                'http://lc-dev.voxastro.org/api_private/data-valc/',
                json=result_list[i:i + BATCH_SIZE],
            )
            print(f'Uploaded [{i}:{i + BATCH_SIZE}) of {len(result_list)}')
            i += BATCH_SIZE


upload()
