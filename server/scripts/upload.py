import json
import re

FILES = [
    # 'JSONS/aug_json_ZTF18aavsilo_NF.txt',
    'JSONS/aug_json_ZTF19acbpnii_NF.txt',
]

for file_name in FILES:
    with open(file_name, 'r') as f:
        name = re.search(r'json_(.*)_', file_name).group(1)

        data = json.loads(json.load(f))

        data['time'] = list(data['time'].values())
        data['flux'] = list(data['flux'].values())
        data['flux_err'] = list(data['flux_err'].values())
        data['passband'] = list(data['passband'].values())

        result = {
            'name': name,
            #'time_with_error': [],
            'time_0': [],
            'time_1': [],
            'flux_0_with_error': [],
            'flux_1_with_error': [],
            'flux_0': [],
            'flux_1': [],
        }

        for i in range(len(data['time'])):
            err = data['flux_err'][i]
            if data['passband'][i] == 0:
                #result['time_with_error'].append(data['time'][i])
                result['time_0'].append(data['time'][i])
                result['flux_0_with_error'].append(data['flux'][i] - err)
                result['flux_0'].append(data['flux'][i])
            else:
                result['time_1'].append(data['time'][i])
                result['flux_1_with_error'].append(data['flux'][i] - err)
                result['flux_1'].append(data['flux'][i])
        for i in reversed(range(len(data['time']))):
            err = data['flux_err'][i]
            if data['passband'][i] == 0:
                #result['time_with_error'].append(data['time'][i])
                result['flux_0_with_error'].append(data['flux'][i] + err)
            else:
                result['flux_1_with_error'].append(data['flux'][i] + err)

        print(json.dumps(result))
