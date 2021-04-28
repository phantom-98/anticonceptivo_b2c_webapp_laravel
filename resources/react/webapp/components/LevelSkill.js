import React from 'react';

const LevelSkill = ({name, level}) => {

    const levelToText = (level) =>{
        switch (level) {
            case 0:
                return 'Sin Nivel';
            case 1:
                return 'Nivel Bajo';
            case 2:
                return 'Nivel Medio';
            case 3:
                return 'Nivel Alto';
            default:
                return 'Nivel Alto';
        }
    }

    return (
        <div className="row mb-3">
            <div className="col-6">
                <span className="font-12 light color-3C3C3E">
                    {name}
                </span>
            </div>
            <div className="col-6 text-right">
                <span className="font-12 light color-3C3C3E">
                    {levelToText(level)}
                </span>
            </div>
            <div className="col-12">
                <div className="progress progress-skills">
                    <div className="progress-bar bg-secondary" role="progressbar"
                         style={{width: ((100 / 3) * level) + '%'}}/>
                </div>
            </div>
        </div>
    );
};

export default LevelSkill;
