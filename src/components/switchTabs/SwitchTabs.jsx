import React, { useState } from 'react'

import "./style.scss"

function SwitchTabs({ data, onTabChange }) {

    const [activeTab, setActiveTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTabHandler = (tab, index) => {
        setLeft(index * 100)
        setTimeout(() => { 
            setActiveTab(index)
        }, 300);
        onTabChange(tab, index)
    }

    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${activeTab === index ? 'active' : ''}`}
                        onClick={() => activeTabHandler( tab, index)}
                    >
                        {tab}
                    </span>
                ))}

                <span className="movingBg" style={{left}} />
            </div>
        </div>
    )
}

export default SwitchTabs