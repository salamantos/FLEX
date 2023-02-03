import json
import math
import os

DIRECTORY_TABLES = 'data/valc/tables'
DIRECTORY_PLOTS = 'data/valc/plots'


def no_nan(value):
    if isinstance(value, float) and math.isnan(value):
        return None
    return value


def process_table(file_name, result_map: dict):
    with open(os.path.join(DIRECTORY_TABLES, file_name), 'r') as f:
        data = json.load(f)

    images_all = data.get('ESIfull') + data.get('MagEfull') + data.get('SALTfull')+ data.get('SALTnonp') + data.get('ESInonp') + data.get('MagEnonp')
    images_all.append(data.get('cutout'))
    result_map[data['name']] = dict(
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
        images=[url for url in images_all if url],
    )


def process_plot(file_name, result_map: dict):
    with open(os.path.join(DIRECTORY_PLOTS, file_name), 'r') as f:
        data = json.load(f)

    if data['name'] not in result_map:
        result_map[data['name']] = dict(name=data['name'])
    result_map[data['name']]['plot'] = dict(
        flux_before_c=data['flux_before_c'],
        MJD_before_c=data['MJD_before_c'],
        flux_err_before_c=data['flux_err_before_c'],

        flux_before_o=data['flux_before_o'],
        MJD_before_o=data['MJD_before_o'],
        flux_err_before_o=data['flux_err_before_o'],

        flux_after_c=data['flux_after_c'],
        MJD_after_c=data['MJD_after_c'],
        flux_err_after_c=data['flux_err_after_c'],

        flux_after_o=data['flux_after_o'],
        MJD_after_o=data['MJD_after_o'],
        flux_err_after_o=data['flux_err_after_o'],
    )


result_map = {}
# files = os.listdir(DIRECTORY_TABLES)
# for file in files:
#     process_table(file, result_map)
files = os.listdir(DIRECTORY_PLOTS)
for file in files:
    process_plot(file, result_map)

with open('processed/valc/valc.json', 'w') as f:
    json.dump(list(result_map.values()), f)
