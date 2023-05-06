for i in `seq 1 100`                                                                                   
do
        adb shell am force-stop com.raisinpets.app
        sleep 1
        adb shell am start-activity -W -n com.raisinpets.app/.MainActivity | grep "TotalTime" | cut -d ' ' -f 2
done
