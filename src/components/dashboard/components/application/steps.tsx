'use client';
export const steps = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: ['firstName','lastName', 'email','phonenumber','country', 'state', 'city', 'street','zip','country','identification']
  },
  {
    id: 'Step 2',
    name: 'Employment Detail',
    fields: ['currentEmployer','jobTitle','empStatus','monthlyIncome','payFreq']
  },
  { id: 'Step 3', name: 'Rental Detail', fields: ['propAddress','rentAmt','managerName','manageCompany','payMethod'] },
  { id: 'Step 4', name: 'Financial Information' , fields: ['bankName','acctHoldName','acctNumber','instNumber','routNumber']},
  { id: 'Step 5', name: 'Agreement', fields: ['hearAbtRx'] },
  { id: 'Step 6', name: 'complete',  }
];
