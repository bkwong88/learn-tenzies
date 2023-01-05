import React from 'react'

export default function Dice(props) {
    const styles = { backgroundColor: props.keep ? "#59E391" : "white" }

    return (
        <div className="dice-face"
            style={styles}
            onClick={props.handleKeep}
        >
            <h2 className="dice-value">{props.value}</h2>
        </div>
    )
}