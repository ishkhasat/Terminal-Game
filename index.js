#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let Name;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        `Who Wants To Be A World War 2 Millionaire? \n` 
    );
    
    await sleep();
    rainbowTitle.stop();

    console.log(`${chalk.bgBlue('HOW TO PLAY')}
    I am a procces on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...
    
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Soldat';
        },
    });

    Name = answers.name;
}

async function question() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Who started the World War 2',
        choices: [
            'Vladimir Putin',
            'Bill Gates',
            'Adolf Hitler',
            'You'
        ]
    });

    return handleAnswer(answers.question_1 === 'Adolf Hitler');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Why Adolf Hitler started World War 2?',
        choices: [
            'He was bored',
            'To have a lot of territory',
            'his code didnt work',
            'His mother wanted to be in France, but there was no money'
        ]
    });

    return handleAnswer(answers.question_2 === 'To have a lot of territory');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'Which countries were at World War 2',
        choices: [
            'Rome',
            'Kingdom of Armenia',
            'Mongolia(Poor Mongols, they do not participate anywhere)',
            'Axis powers and Allies'
        ]
    });

    return handleAnswer(answers.question_3 === 'Axis powers and Allies');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'Where was the first atom bomb tested?',
        choices: [
            'On me',
            'At you',
            'On Rome',
            'Hiroshima and Nagasaki'
        ]
    });

    return handleAnswer(answers.question_4 === 'Hiroshima and Nagasaki');
}

async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'Adolf Hitler won',
        choices: [
            'Yes',
            'No(Idioit, Dont you see)',
        ]
    });

    return handleAnswer(answers.question_5 === 'No(Idioit, Dont you see)');
}


async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${Name}`});
    } else {
        spinner.error({ text: `💀💀💀 Game over, you lose ${Name}!`});
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const msg = `Congrats, ${Name}! \n $ 1 , 0 0 0 , 0 0 0`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })

}

await welcome()
await askName()
await question()
await question2()
await question3()
await question4()
await question5()
await winner()