import { Text, View } from "react-native";
import { styles } from "./style";
import { useEffect, useState } from "react";

function Clock({getTimeOut, minutes, isReFresh}) {
    const [minute, setMinute] = useState(minutes - 1);
    const [second, setSecond] = useState(59);

    useEffect(() => {
        setMinute(minutes - 1)
        setSecond(59)
    }, [isReFresh])

    useEffect(() => {
        const countTime = setInterval(() => {
            if (second > 0) {
                setSecond(second - 1);
            }
            if (second === 0) {
                if (minute === 0) {
                    clearInterval(countTime)
                    getTimeOut(true)
                } else {
                    setMinute(minute - 1);
                    setSecond(59);
                    getTimeOut(false)
                }
            }
        }, 1000)
        return () => {
            clearInterval(countTime)
        }
    })

    return (
        <View style={styles.clock}>
            <Text style={styles.time}>{minute}:{second}</Text>
        </View>
    )
}

export default Clock;