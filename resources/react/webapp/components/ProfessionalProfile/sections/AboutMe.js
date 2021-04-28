import React from 'react';
import GeneralSectionEdit from "../GeneralSectionEdit";

const AboutMe = ({title, urlPost, professionalId, initialText, editable = true}) => {
    return (
        <GeneralSectionEdit
            title={title}
            urlPost={urlPost}
            professionalId={professionalId}
            initialText={initialText}
            editable={editable}
        />
    )
};

export default AboutMe;
