// Instagram Links Update Script
const instagramAccounts = {
    'harsh': 'codeex._.heoster',
    'parduman': 'kittu_pandat001',
    'kartik': 'kartik_bharadwaj72',
    'pankaj': '__pankajthakur2',
    'lakshay': '1__numbri__',
    'nawajish': 'official_nawajish_295',
    'vishesh': 'vishesh_soam_07',
    'sahil': '_imkhansahil_',
    'tushar': 'rjput_tushar.0007',
    'yougank': 'kaju_rana_0001',
    'masum': 'masummalik30',
    'shiv': 'rajputana_shiv_',
    'arijit': '', // No account provided
    'pintu': 'rajput._.boy_0001',
    'ayush': 'thakur__ayush__soam',
    'shivaji': 'shiva_ji_00',
    'sachin': 'its_saini0002',
    'varun': 'varunrajput6290',
    'hani': 'its_honey_kashyap_ak47',
    'anshul': 'anshulgujjar8776',
    'abhishek': 'itx__abhishek_302',
    'arjun': 'arjundhaka479',
    'dheraj': 'dheeraj_som__2110',
    'rajat': 'rajatchoudhary3496',
    'aditya': '', // No account provided
    'rudra': '', // No account provided
    'mudashir': 'the.shaaan___',
    'ravi': '', // Not available
    'aashish': 'ashish__jayant',
    'rijwaan': 'riwan.chaudhary'
};

console.log('Instagram accounts mapping:');
Object.entries(instagramAccounts).forEach(([name, account]) => {
    if (account) {
        console.log(`${name}: @${account} - https://instagram.com/${account}`);
    } else {
        console.log(`${name}: No Instagram account`);
    }
});

// This script serves as a reference for manual updates
// Each friend page needs to be updated individually