import inquirer from "inquirer";

export const phone = async () => {
    const { phone } = await inquirer.prompt([
        {
            type: 'input',
            name: 'phone',
            message: 'Please enter your number: ',
        },
    ])

    return phone
};

export const code = async () => {
    const { code } = await inquirer.prompt([
        {
            type: 'input',
            name: 'code',
            message: 'Please enter the code you received: ',
        },
    ])

    return code
};

export const password = async () => {
    const { password } = await inquirer.prompt([
        {
            type: 'password',
            name: 'password',
            message: 'Please enter your password: ',
        },
    ])

    return password
};