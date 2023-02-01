import json
import math
import os

DIRECTORY = 'data/valc'


def no_nan(value):
    if isinstance(value, float) and math.isnan(value):
        return None
    return value


def process(file_name, result_list):
    with open(os.path.join(DIRECTORY, file_name), 'r') as f:
        data = json.load(f)

    result_list.append(dict(
        name=data['name'],
        params={
            'Statistics': no_nan(data.get('Statistics')),
            'ra': no_nan(data.get('ra')),
            'dec': no_nan(data.get('dec')),
            'MBH': no_nan(data.get('MBH')),
            'MBH_MagE': no_nan(data.get('MBH_MagE')),
            'MBH_ESI': no_nan(data.get('MBH_ESI')),
            'MBH_SALT': no_nan(data.get('MBH_SALT')),
            'source': no_nan(data.get('source')),
            'Gamma': no_nan(data.get('Gamma')),
            'L_X': no_nan(data.get('L_X')),
            'NH': no_nan(data.get('NH')),
            'Table from': no_nan(data.get('Table from')),
            'rcsed': no_nan(data.get('rcsed')),
            'page.html': no_nan(data.get('page.html')),
            'page_all_fit': no_nan(data.get('page_all_fit')),
        },
        images_all = data.get('cutout') + data.get('ESIfull')\
             + data.get('MagEfull') + data.get('SALTfull')\
             + data.get('SALTnonp') + data.get('ESInonp')\ 
            + data.get('MagEnonp')
        images=[url for url in images_all if url],
    ))


result_list = []
files = os.listdir(DIRECTORY)
for file in files:
    process(file, result_list)

with open('processed/valc/valc.json', 'w') as f:
    json.dump(result_list, f)
