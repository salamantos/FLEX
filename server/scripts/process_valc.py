import json
import math
import os

DIRECTORY_TABLES = 'data/valc/tables'
DIRECTORY_PLOTS_ATLAS = 'data/valc/plots_atlas'
DIRECTORY_PLOTS_ZTF = 'data/valc/plots_ztf'


def no_nan(value):
    if isinstance(value, float) and math.isnan(value):
        return None
    return value


def process_table(file_name, result_map: dict):
    with open(os.path.join(DIRECTORY_TABLES, file_name), 'r') as f:
        data = json.load(f)

    images_all = data.get('ESIfull') + data.get('MagEfull') + data.get('SALTfull')+ data.get('SALTnonp') + data.get('ESInonp') + data.get('MagEnonp')
    result_map[data['name']] = dict(
        name=data['name'],
        params={
            'Statistics': no_nan(data.get('Statistics')),
            'ra': no_nan(data.get('ra')),
            'dec': no_nan(data.get('dec')),
            'MBH_SDSS': no_nan(data.get('MBH')),
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
            'redshift': no_nan(data.get('redshift')),
        },
        images=[url for url in images_all if url],
        image_cutout=data.get('cutout'),
    )


def process_plot_atlas(file_name, result_map: dict):
    with open(os.path.join(DIRECTORY_PLOTS_ATLAS, file_name), 'r') as f:
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

def process_plot_ztf(file_name, result_map: dict):
    with open(os.path.join(DIRECTORY_PLOTS_ZTF, file_name), 'r') as f:
        data = json.load(f)

    if data['name'] not in result_map:
        result_map[data['name']] = dict(name=data['name'])
    result_map[data['name']]['plot'] = dict(
        flux_before_r=data['flux_before_r'],
        MJD_before_r=data['MJD_before_r'],
        flux_err_before_r=data['flux_err_before_r'],

        flux_before_g=data['flux_before_g'],
        MJD_before_g=data['MJD_before_g'],
        flux_err_before_g=data['flux_err_before_g'],

        mask_before_r=data['mask_before_r'],#these fields show for each flux point which part of detector (qid) from 0 to 63, we need to plot each number with different markers or colors or  edge (0 - boxes,1- circles,  and so on),and plot in legend 
        mask_after_r=data['mask_after_r'],
        mask_before_g=data['mask_before_g'],
        mask_after_g=data['mask_after_g'],

        flux_after_r=data['flux_after_r'],
        MJD_after_r=data['MJD_after_r'],
        flux_err_after_r=data['flux_err_after_r'],

        flux_after_g=data['flux_after_g'],
        MJD_after_g=data['MJD_after_g'],
        flux_err_after_g=data['flux_err_after_g'],

        flux_outl_r=data['flux_after_r'],#these fields plot as black stars with color edge as color of filter (r or g)
        MJD_outl_r=data['MJD_after_r'],
        flux_err_outl_r=data['flux_err_after_r'],

        flux_outl_g=data['flux_after_g'],
        MJD_outl_g=data['MJD_after_g'],
        flux_err_outl_g=data['flux_err_after_g'],
    )


result_map = {}
files = os.listdir(DIRECTORY_TABLES)
for file in files:
    process_table(file, result_map)
files = os.listdir(DIRECTORY_PLOTS_ATLAS)
for file in files:
    process_plot_atlas(file, result_map)
files = os.listdir(DIRECTORY_PLOTS_ZTF)
for file in files:
    process_plot_ztf(file, result_map)

with open('processed/valc/valc.json', 'w') as f:
    json.dump(list(result_map.values()), f)
