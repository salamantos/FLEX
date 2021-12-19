import json

FILES = [
    'data/aug_json_ZTF18abdgwxn_BNN.txt',
]

for file_name in FILES:
    with open(file_name, 'r') as f:
        data = json.loads(json.load(f))
        print(data)
