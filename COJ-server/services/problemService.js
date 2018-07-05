const ProblemModel = require('../models/problemModel');

const getProblems = () => {
    // return new Promise((resolve, reject) => {
    //     resolve(problems);
    // });
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, (err, problems) => {
            if (err) {
                reject(err);
            } else {
                resolve(problems);
            }
        })
    })
};

const getProblem = (id) => {
    return new Promise((resolve, reject) => {
        // resolve(problems.find(problem => problem.id === id));
        ProblemModel.findOne({id:id}, (err, problem) => {
            if (err) {
                reject(err);
            } else {
                resolve(problem);
            }
        })
    });
};

const addProblem = (newProblem) => {
    return new Promise((resolve, reject) => {
        // if (problems.find(problem => problem.name === newProblem.name)) {
        //     reject('Problem name already exists by checking.');
        // } else {
        //     newProblem.id = problems.length + 1;
        //     problems.push(newProblem);
        //     resolve(newProblem);
        // };
        ProblemModel.findOne({name:newProblem.name}, (err, res) => {
            if (res) {
                reject('Problem name exists.');
            } else {
                ProblemModel.count({}, (err, num) => {
                    newProblem.id = num + 1;
                    const mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(mongoProblem);
                })
            }
        })
    });
};

module.exports = {
    getProblems,
    getProblem,
    addProblem
}