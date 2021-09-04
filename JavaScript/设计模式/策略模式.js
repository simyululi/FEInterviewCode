const strategies = {
    s:(salary) => {
        return salary * 4
    },
    a:(salary) => {
        return salary * 3
    },
    b:(salary) => {
        return salary * 2
    },
};
const calculateBonue = (level, salary) => {
    return strategies[level](salary)
}
console.log(calculateBonue("s", 20000));
