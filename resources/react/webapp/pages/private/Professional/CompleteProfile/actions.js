export const validateCompleteProfile = (profile_section_status) => {
    if(
        profile_section_status.terms == 0 ||
        profile_section_status.abilities == 0 ||
        profile_section_status.basicInfo == 0 ||
        profile_section_status.extraInfo == 0
    ){
        return false;
    }
    return true;
}

export const runView = (profile_section_status) => {
    if (profile_section_status.terms == 0) {
        return 'terms'
    }
    if (profile_section_status.abilities == 0) {
        return 'abilities'
    }
    if (profile_section_status.basicInfo == 0) {
        return 'basicInfo'
    }
    if (profile_section_status.extraInfo == 0) {
        return 'extraInfo'
    }
    return 'completed';
};

export const redirectProfessionalAuth = () =>{

}
