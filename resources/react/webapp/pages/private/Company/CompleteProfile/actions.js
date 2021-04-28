export const validateCompanyCompleteProfile = (profile_section_status) => {
    if(
        profile_section_status.personalInfo == 0 ||
        profile_section_status.billingInfo == 0
    ){
        return false;
    }
    return true;
}

export const runView = (profile_section_status) => {
    if (profile_section_status.personalInfo == 0) {
        return 'personalInfo'
    }
    if (profile_section_status.billingInfo == 0) {
        return 'billingInfo'
    }
    return 'completed';
};
