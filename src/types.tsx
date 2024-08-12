export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type MembershipsType = {
  id: string;
  membershipType: string;
  membershipAmt: string;
  membershipDuration: string;
  membershipAmenities: string;
};

export type MembershipInfoType = {
  Membership_Info: [
    {
      id: string;
      membershipAmt: string;
      membershipDuration: string;
      membershipExpireDate: Date;
      membershipStartDate: Date;
      membershipStatus: string;
      membershipType: string;
      userId: string;
    }
  ];
  name: string;
  email: string;
};
export type UserInfoType = {
  Property_Info: [
    {
      id: string;
      propName: string;
      propAddress: string;
      rentAmt: string;
      manageCompany: string;
      managerName: string;
      payMethod: string;
      userId: string;
    }
  ];
  name: string;
  phonenumber: string;
  jobTitle: string;
  email: string;
  currentEmployer: string;
  monthlyIncome: string;
  country: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  empStatus: string;
  payFreq: string;
  hearAbtRx: string;
  isApproved: boolean;
};

export type MembershipCheckout = {
  membershipAmt: number;
  membershipName: string;
};

export type PropertyInfoType = {
  Property_Info: [
    {
      id: string;
      propName: string;
      propAddress: string;
      propType: string;
      propNoOfBeds: string;
      rentAmt: string;
      manageCompany: string;
      managerName: string;
      propManagerEmail: string;
      propManagerPhone: string;
      payMethod: string;

      userId: string;
    }
  ];
  name: string;
  phonenumber: string;
  jobTitle: string;
  email: string;
  currentEmployer: string;
  payFreq: String;
  monthlyIncome: string;
  empStatus: String;
};
export type MonthlyRecordInfoType = {
  Monthly_Rent_Record: [
    {
      id: string;
      month: string;
      year: string;
      rentPaid: string;
      remainingRent: string;
      totalRent: string;
    }
  ];
};

export type PaymentInfoType = {
  Payment_Info: [
    {
      id: string;
      paymentId: string;
      paymentType: string;
      rentAmt: string;
      paymentAmt: string;
      remainingAmt: string;
      payemntDate: Date;
      transactionType: string;
      status: string;
    }
  ];
};
export type ReferralInfoType = {
  Referals: [
    {
      id: string;
      referAmt: string;
      referCode: string;
      referToEmail: string;
      userId: string;
    }
  ];
};
