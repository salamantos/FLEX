import csv
import json

ALGOS = {
    'GP': {
        'dots_file_name': 'data/fulu/train_aug_json_GP_C1_0*Matern_*_RBF1,_1_+_Matern_+_WhiteKernel.txt',
        'peaks_file_name': 'data/fulu/peaks/GP_C1_0*Matern_*_RBF1,_1_+_Matern_+_WhiteKernel_peaks.csv',
        'suffix': 'GP',
        'enabled': True
    },
    'BNN': {
        'dots_file_name': 'data/fulu/train_aug_json_BNN.txt',
        'peaks_file_name': 'data/fulu/peaks/BNN_peaks.csv',
        'suffix': 'BNN',
        'enabled': True
    },
    'NN_sklearn': {
        'dots_file_name': 'data/fulu/train_aug_json_NN (sklearn).txt',
        'peaks_file_name': 'data/fulu/peaks/NN (sklearn)_peaks.csv',
        'suffix': 'NN_sklearn',
        'enabled': True
    },
    'NN_pytorch': {
        'dots_file_name': 'data/fulu/train_aug_json_NN (pytorch).txt',
        'peaks_file_name': 'data/fulu/peaks/NN (pytorch)_peaks.csv',
        'suffix': 'NN_pytorch',
        'enabled': True
    },
    'NF': {
        'dots_file_name': 'data/fulu/train_aug_json_NF.txt',
        'peaks_file_name': 'data/fulu/peaks/NF_peaks.csv',
        'suffix': 'NF',
        'enabled': True
    },
}


def process(algo):
    if not ALGOS[algo]['enabled']:
        print(f'Algo {algo} disabled')
        return
    print(f'Processing {algo}')

    full_result = []
    with open(ALGOS[algo]['dots_file_name'], 'r') as f:
        full_data = json.loads(json.load(f))

    peaks_data = {}
    with open(ALGOS[algo]['peaks_file_name'], 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            peaks_data[row['obj_names']] = {
                'peaks_sum': row['times_sum'],
                'peaks': {
                    'times_sum': row['times_sum'],
                    'magnitudes': row['magnitudes'],
                    'fluxes': row['fluxes'],
                    'magnitudes_g': row['magnitudes_g'],
                    'fluxes_g': row['fluxes_g'],
                    'times_g': row['times_g'],
                    'magnitudes_r': row['magnitudes_r'],
                    'fluxes_r': row['fluxes_r'],
                    'times_r': row['times_r'],
                },
            }

    for i in full_data['id'].keys():
        object_name = full_data['name'][i]
        name = f'{object_name}_{ALGOS[algo]["suffix"]}'
        data = {}
        data['time'] = list(full_data['t'][i])
        data['flux'] = list(full_data['flux'][i])
        data['flux_err'] = list(full_data['flux_err'][i])
        data['passband'] = list(full_data['passband'][i])
        data['time_aug'] = list(full_data['t_aug'][i])
        data['flux_aug'] = list(full_data['flux_aug'][i])
        data['flux_err_aug'] = list(full_data['flux_err_aug'][i])
        data['passband_aug'] = list(full_data['passband_aug'][i])

        result = {
            'name': name,
            'time': [],
            'time_error': [],
            'flux_0_error': [],
            'flux_1_error': [],
            'flux_0': [],
            'flux_1': [],
            'time_aug': [],
            'time_error_aug': [],
            'flux_0_error_aug': [],
            'flux_1_error_aug': [],
            'flux_0_aug': [],
            'flux_1_aug': [],
            'peaks_sum': peaks_data.get(object_name, {}).get('peaks_sum'),
            'peaks': peaks_data.get(object_name, {}).get('peaks'),
        }

        for i in range(len(data['time'])):
            if data['passband'][i] == 0:
                result['time_error'].append(data['time'][i])
                result['time'].append(data['time'][i])
                result['flux_0_error'].append(data['flux_err'][i])
                result['flux_0'].append(data['flux'][i])
            else:
                result['flux_1_error'].append(data['flux_err'][i])
                result['flux_1'].append(data['flux'][i])
        for i in reversed(range(len(data['time']))):
            if data['passband'][i] == 0:
                result['time_error'].append(data['time'][i])
                result['flux_0_error'].append(data['flux_err'][i])
            else:
                result['flux_1_error'].append(data['flux_err'][i])

        for i in range(len(data['time_aug'])):
            err = data['flux_err_aug'][i]
            if data['passband_aug'][i] == 0:
                result['time_error_aug'].append(data['time_aug'][i])
                result['time_aug'].append(data['time_aug'][i])
                result['flux_0_error_aug'].append(data['flux_aug'][i] - err)
                result['flux_0_aug'].append(data['flux_aug'][i])
            else:
                result['flux_1_error_aug'].append(data['flux_aug'][i] - err)
                result['flux_1_aug'].append(data['flux_aug'][i])
        for i in reversed(range(len(data['time_aug']))):
            err = data['flux_err_aug'][i]
            if data['passband_aug'][i] == 0:
                result['time_error_aug'].append(data['time_aug'][i])
                result['flux_0_error_aug'].append(data['flux_aug'][i] + err)
            else:
                result['flux_1_error_aug'].append(data['flux_aug'][i] + err)

        full_result.append(result)

    with open(f'processed/fulu/{ALGOS[algo]["suffix"]}.json', 'w') as f:
        json.dump(full_result, f)


for algo_name in ALGOS.keys():
    process(algo_name)
