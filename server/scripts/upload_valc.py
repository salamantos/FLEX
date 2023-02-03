import json

import requests

HOST = 'http://localhost:7001'
BATCH_SIZE = 100


def upload():
    with open('processed/valc/valc.json', 'r') as f:
        result_list = json.load(f)
        i = 0
        while i < len(result_list):
            response = requests.post(
                f'{HOST}/api_private/data-valc/',
                json=result_list[i:i + BATCH_SIZE],
            )
            if not response.ok:
                print(response.status_code, response.json())
                raise Exception
            print(f'Uploaded [{i}:{i + BATCH_SIZE}) of {len(result_list)}')
            i += BATCH_SIZE


upload()
