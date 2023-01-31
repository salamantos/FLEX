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
            'source': no_nan(data.get('source')),
            'Gamma': no_nan(data.get('Gamma')),
            'L_X': no_nan(data.get('L_X')),
            'NH': no_nan(data.get('NH')),
            'Table from': no_nan(data.get('Table from: ')),
            'rcsed': no_nan(data.get('rcsed')),
            'page.html': no_nan(data.get('page.html')),
            'page_all_fit': no_nan(data.get('page_all_fit')),
        },
        images=[url for url in [
            no_nan(data.get('cutout')),
            no_nan(data.get('ESI2D')),
            no_nan(data.get('MagE2D')),
            no_nan(data.get('SALT2D')),
            no_nan(data.get('SALT_spec')),
            no_nan(data.get('png with 2d')),
            no_nan(data.get('png with fit')),
            no_nan(data.get('page.spect')),
        ] if url],
    ))


result_list = []
files = os.listdir(DIRECTORY)
for file in files:
    process(file, result_list)

with open('processed/valc/valc.json', 'w') as f:
    json.dump(result_list, f)
