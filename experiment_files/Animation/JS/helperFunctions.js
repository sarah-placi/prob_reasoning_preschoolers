function startInputDlg() {
    let subjectId, age, sex;
    document.getElementById('inputButtonOk').addEventListener('click', (e) => {
        e.preventDefault();
        subjectId = document.forms['inputForm']['subjectId'].value;
        age = document.forms['inputForm']['age'].value;
        sex = document.forms['inputForm']['choice'].value;
        if (!subjectId || isNaN(subjectId)) {
            alert('Warning: Not a valid [Subject Id] \nHint: Input a number');
            document.getElementById('subjectId').focus();
            document.getElementById("subjectId").select();
        } else {
            document.getElementById('inputWindow').style.display = 'none';
            document.getElementById('expWindow').style.display = 'grid';
            document.body.style.backgroundColor = 'GhostWhite';
            if (typeof document.documentElement.requestFullscreen === 'function') {
                document.documentElement.requestFullscreen().catch(() => {
                    console.log('Unable to go fullscreen. Sorry!');
                });
            }
            else if (typeof document.documentElement.mozRequestFullScreen === 'function') {
                document.documentElement.mozRequestFullScreen();
            }
            else if (typeof document.documentElement.webkitRequestFullscreen === 'function') {
                document.documentElement.webkitRequestFullscreen();
            }
            else if (typeof document.documentElement.msRequestFullscreen === 'function') {
                document.documentElement.msRequestFullscreen();
            }
            else {
                console.log('Unable to go fullscreen.');
            }
            runExperiment(subjectId, age, sex);
        }
    });
    document.getElementById('inputButtonCanc').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('inputWindow').style.display = 'none';
        document.getElementById('expWindow').style.display = 'grid';
        document.body.style.backgroundColor = 'GhostWhite';
        exitExperiment();
    });
    window.addEventListener('keydown', (e) => {
        //alert("Tasto premuto: " + e.key + "\n");
        if (e.key) {
            if (e.key == 'r') {
                location.reload();
            }
        }
    });
}

function runExperiment(subjectId, age, sex) {
    const practice = [
        { trialType: 'practice', trialNr: 1, n1BallScene1: 4, n2BallScene1: 4, n1BallScene2: 4, n2BallScene2: 4, corrUrn: 'null' },
        { trialType: 'practice', trialNr: 2, n1BallScene1: 8, n2BallScene1: 8, n1BallScene2: 8, n2BallScene2: 8, corrUrn: 'null' }
    ],
        practice2 = [
            { trialType: 'practice2', trialNr: 3, n1BallScene1: 3, n2BallScene1: 3, n1BallScene2: 3, n2BallScene2: 3, corrUrn: 'null' },
            { trialType: 'practice2', trialNr: 4, n1BallScene1: 6, n2BallScene1: 6, n1BallScene2: 6, n2BallScene2: 6, corrUrn: 'null' }
        ],
        conditions = [
            { trialType: 'exp', trialNr: 5, n1BallScene1: 8, n2BallScene1: 0, n1BallScene2: 0, n2BallScene2: 8, corrUrn: 1 },
            { trialType: 'exp', trialNr: 6, n1BallScene1: 0, n2BallScene1: 16, n1BallScene2: 16, n2BallScene2: 0, corrUrn: 2 },
            { trialType: 'exp', trialNr: 7, n1BallScene1: 8, n2BallScene1: 2, n1BallScene2: 2, n2BallScene2: 8, corrUrn: 1 },
            { trialType: 'exp', trialNr: 8, n1BallScene1: 4, n2BallScene1: 16, n1BallScene2: 16, n2BallScene2: 4, corrUrn: 2 },
            { trialType: 'exp', trialNr: 9, n1BallScene1: 6, n2BallScene1: 9, n1BallScene2: 3, n2BallScene2: 27, corrUrn: 1 },
            { trialType: 'exp', trialNr: 10, n1BallScene1: 6, n2BallScene1: 54, n1BallScene2: 12, n2BallScene2: 18, corrUrn: 2 },
            { trialType: 'exp', trialNr: 11, n1BallScene1: 2, n2BallScene1: 3, n1BallScene2: 3, n2BallScene2: 27, corrUrn: 1 },
            { trialType: 'exp', trialNr: 12, n1BallScene1: 6, n2BallScene1: 54, n1BallScene2: 4, n2BallScene2: 6, corrUrn: 2 },
            { trialType: 'exp', trialNr: 13, n1BallScene1: 10, n2BallScene1: 15, n1BallScene2: 1, n2BallScene2: 9, corrUrn: 1 },
            { trialType: 'exp', trialNr: 14, n1BallScene1: 2, n2BallScene1: 18, n1BallScene2: 20, n2BallScene2: 30, corrUrn: 2 },
            { trialType: 'exp', trialNr: 15, n1BallScene1: 6, n2BallScene1: 4, n1BallScene2: 4, n2BallScene2: 6, corrUrn: 1 },
            { trialType: 'exp', trialNr: 16, n1BallScene1: 8, n2BallScene1: 12, n1BallScene2: 12, n2BallScene2: 8, corrUrn: 2 },
            { trialType: 'exp', trialNr: 17, n1BallScene1: 9, n2BallScene1: 1, n1BallScene2: 3, n2BallScene2: 2, corrUrn: 1 },
            { trialType: 'exp', trialNr: 18, n1BallScene1: 6, n2BallScene1: 4, n1BallScene2: 18, n2BallScene2: 2, corrUrn: 2 },
            { trialType: 'exp', trialNr: 19, n1BallScene1: 9, n2BallScene1: 1, n1BallScene2: 15, n2BallScene2: 10, corrUrn: 1 },
            { trialType: 'exp', trialNr: 20, n1BallScene1: 30, n2BallScene1: 20, n1BallScene2: 18, n2BallScene2: 2, corrUrn: 2 },
            { trialType: 'exp', trialNr: 21, n1BallScene1: 27, n2BallScene1: 3, n1BallScene2: 3, n2BallScene2: 2, corrUrn: 1 },
            { trialType: 'exp', trialNr: 22, n1BallScene1: 6, n2BallScene1: 4, n1BallScene2: 54, n2BallScene2: 6, corrUrn: 2 }
        ],
        ballRadius = 22, //15
        scale = 100,
        [sceneWidth, sceneHeight] = [500, 500],
        divFiller = document.getElementById('divFiller'),
        canvas1 = document.getElementById('canvas1'),
        canvas2 = document.getElementById('canvas2'),
        canvas3 = document.getElementById('canvas3'),
        canvas4 = document.getElementById('canvas4'),
        canvas1b = document.getElementById('canvas1b'),
        canvas2b = document.getElementById('canvas2b'),
        canvas2c = document.getElementById('canvas2c'),
        canvas3b = document.getElementById('canvas3b'),
        canvas4b = document.getElementById('canvas4b'),
        canvas4c = document.getElementById('canvas4c'),
        canvasFeedback = document.getElementById('canvasFeedback'),
        ctxFeedback = canvasFeedback.getContext('2d'),
        ctx1 = canvas1.getContext('2d'),
        ctx3 = canvas3.getContext('2d'),
        maskColor = 'Black', //'#B9F0F0'
        shuffleArray = array => { // Fisher-Yates shuffle algorithm
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
                // swap array[i] and array[j] by destructuring assignment
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
    let scene1 = new Scene('canvas1', 'canvas2', sceneWidth, sceneHeight, 'circle', ballRadius, 'GhostWhite', 'GhostWhite', '', scale),
        scene2 = new Scene('canvas3', 'canvas4', sceneWidth, sceneHeight, 'circle', ballRadius, 'GhostWhite', 'GhostWhite', '', scale),
        exampleBall1, exampleBall2,
        impulseAngle = 60,
        impulsePower1, impulsePower2,
        [restart, impulse, draw, next] = [false, false, false, false],
        [unmask, exit] = [false, false],
        [draw1, draw2] = [false, false],
        [drawSwt1, drawSwt2] = [true, true],
        [impulseSwt1, impulseSwt2] = [true, true],
        [start, finish, sceneClick, feedback, noFeedback] = [false, false, true, true, true],
        mouseOverAndOut = true,
        feedbackImg = new Image(),
        resFeedBack, fbCongr,
        audio,
        shuffledPractice = shuffleArray(practice),
        shuffledPractice2 = shuffleArray(practice2),
        shuffledConditions = shuffleArray(conditions),
        shuffledTrials = [...shuffledPractice, ...shuffledPractice2, ...shuffledConditions],
        trialsIterator = shuffledTrials.entries(),
        currentTrial,
        n1BallScene1, n2BallScene1, n1BallScene2, n2BallScene2,
        trialType, trialNr,
        //https://www.w3schools.com/colors/colors_names.asp
        [practiceCol1, practiceCol2] = ['Blue', 'Yellow'],
        expCol1, expCol2,
        sceneSelected, sceneCorrect, correctAns, //colSelected,
        drawnCol, winCol,
        fileName, workBook, workSheet,
        resHeader = [], resTrial = [], results = [];
    var [i, j, k, n, m] = [0, 0, 1, 0, 0];

    resHeader = ['subjId', 'age', 'sex', 'trialNr', 'n1Urn1', 'n2Urn1', 'n1Urn2', 'n2Urn2',
        'col1', 'col2', 'selectedUrn', 'correctUrn', 'correctAns', 'drawnCol', 'winCol', 'feedBack', 'fbCongr'];
    results.push(resHeader);
    if (subjectId) {
        if (subjectId < 10) fileName = 'S0' + subjectId + '.xlsx';
        else fileName = 'S' + subjectId + '.xlsx';
    }
    if (subjectId) {
        if (subjectId % 2 == 1) {
            [expCol1, expCol2] = ['Blue', 'Yellow'];
            winCol = 'Blue';
        } else {
            [expCol1, expCol2] = ['Yellow', 'Blue'];
            winCol = 'Yellow';
        }
    }
    canvas1.width = sceneWidth;
    canvas1.height = sceneHeight;
    canvas2.width = sceneWidth * 0.4;
    canvas2.height = sceneHeight * 0.2;
    canvas3.width = sceneWidth;
    canvas3.height = sceneHeight;
    canvas4.width = sceneWidth * 0.4;
    canvas4.height = sceneHeight * 0.2;
    canvas1b.width = canvas2.width;
    canvas1b.height = canvas2.height / 2;
    canvas2b.width = canvas2.width / 3;
    canvas2b.height = canvas2.width / 3;
    canvas2c.width = canvas2.width / 3;
    canvas2c.height = canvas2.width / 3;
    canvas3b.width = canvas2.width;
    canvas3b.height = canvas2.height / 2;
    canvas4b.width = canvas2.width / 3;
    canvas4b.height = canvas2.width / 3;
    canvas4c.width = canvas2.width / 3;
    canvas4c.height = canvas2.width / 3;
    canvasFeedback.width = 170;
    canvasFeedback.height = 170;
    divFiller.style.width = '170px';
    divFiller.style.height = '418px';
    document.getElementById('impulse').disabled = true;
    document.getElementById('draw').disabled = true;
    document.getElementById('canvas1').addEventListener('mouseover', () => {
        if (mouseOverAndOut && !unmask && start) {
            document.getElementById('div1').style.borderColor = 'green';
        }
    });
    document.getElementById('canvas1').addEventListener('mouseout', () => {
        if (mouseOverAndOut && !unmask && start) {
            document.getElementById('div1').style.borderColor = 'transparent';
        }
    });
    document.getElementById('canvas1').addEventListener('click', () => {
        if (!unmask && start && sceneClick) {
            document.getElementById('div1').style.borderColor = 'green';
            document.getElementById('div3').style.borderColor = 'transparent';
            document.getElementById('draw').disabled = false;
            mouseOverAndOut = false;
            sceneSelected = 1;
        }
    });
    document.getElementById('canvas3').addEventListener('mouseover', () => {
        if (mouseOverAndOut && !unmask && start) {
            document.getElementById('div3').style.borderColor = 'green';
        }
    });
    document.getElementById('canvas3').addEventListener('mouseout', () => {
        if (mouseOverAndOut && !unmask && start) {
            document.getElementById('div3').style.borderColor = 'transparent';
        }
    });
    document.getElementById('canvas3').addEventListener('click', () => {
        if (!unmask && start && sceneClick) {
            document.getElementById('div3').style.borderColor = 'green';
            document.getElementById('div1').style.borderColor = 'transparent';
            document.getElementById('draw').disabled = false;
            mouseOverAndOut = false;
            sceneSelected = 2;
        }
    });
    /* document.getElementById('restart').addEventListener('click', () => {
        restart = true;
    }); */
    document.getElementById('impulse').addEventListener('click', () => {
        impulse = true;
    });
    document.getElementById('draw').addEventListener('click', () => {
        draw = true;
    });
    document.getElementById('next').addEventListener('click', () => {
        next = true;
        start = true;
        sceneClick = true;
    });
    window.addEventListener('keydown', (e) => {
        //alert("Tasto premuto: " + e.key + "\n");
        if (e.key) {
            if (e.key == 'r') {
                restart = true;
            } else if (e.key == 'i') {
                impulse = true;
            } else if (e.key == 'd') {
                draw = true;
            } else if (e.key == 'n') {
                next = true;
                start = true;
            } else if (e.key == 'Escape') {
                mouseOverAndOut = true;
                unmask = false;
                start = false;
            }
        }
    });
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            //console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
        } else {
            //console.log('Leaving full-screen mode.');
            if (!currentTrial) exit = true;
            else if (!currentTrial.done) exit = true;
        }
    });
    if (true) {
        //document.addEventListener('DOMContentLoaded', () => {
        (function loop() {
            if (restart) {
                location.reload();
            }
            if (impulse) {
                impulseAngle = 180 - impulseAngle;
                scene1.setImpulseCanvas1(impulseAngle, impulsePower1);
                scene2.setImpulseCanvas1(impulseAngle, impulsePower2);
                impulse = false;
            }
            if (next) {
                currentTrial = trialsIterator.next();
                if (currentTrial.done) {
                    exit = true;
                } else {
                    n1BallScene1 = currentTrial.value[1]['n1BallScene1'];
                    n2BallScene1 = currentTrial.value[1]['n2BallScene1'];
                    n1BallScene2 = currentTrial.value[1]['n1BallScene2'];
                    n2BallScene2 = currentTrial.value[1]['n2BallScene2'];
                    trialType = currentTrial.value[1]['trialType'];
                    trialNr = currentTrial.value[1]['trialNr'];
                    sceneCorrect = currentTrial.value[1]['corrUrn'];
                    let nBallScene1 = n1BallScene1 + n2BallScene1,
                        nBallScene2 = n1BallScene2 + n2BallScene2;
                    if (nBallScene1 > 40) impulsePower1 = 70;
                    else if (nBallScene1 > 30) impulsePower1 = 50;
                    else if (nBallScene1 > 20) impulsePower1 = 40;
                    else if (nBallScene1 > 10) impulsePower1 = 30;
                    else impulsePower1 = 10;
                    if (nBallScene2 > 40) impulsePower2 = 70;
                    else if (nBallScene2 > 30) impulsePower2 = 50;
                    else if (nBallScene2 > 20) impulsePower2 = 40;
                    else if (nBallScene2 > 10) impulsePower2 = 30;
                    else impulsePower2 = 10;
                    if (trialType == 'practice') {
                        [ballCol1, ballCol2] = [practiceCol1, practiceCol2];
                        feedback = false;
                        noFeedback = true;
                    } else if (trialType == 'practice2') {
                        [ballCol1, ballCol2] = [practiceCol1, practiceCol2];
                        feedback = true;
                    } else if (trialType == 'exp') {
                        [ballCol1, ballCol2] = [expCol1, expCol2];
                        feedback = true;
                    }
                    scene1 = void 0;
                    scene2 = void 0;
                    scene1 = new Scene('canvas1', 'canvas2', sceneWidth, sceneHeight, 'circle', ballRadius, '', '', '', scale);
                    scene2 = new Scene('canvas3', 'canvas4', sceneWidth, sceneHeight, 'circle', ballRadius, '', '', '', scale);
                    unmask = true;
                    sceneClick = true;
                    restart = false;
                    impulse = false;
                    draw = false;
                    draw1 = false;
                    draw2 = false;
                    drawSwt1 = true;
                    drawSwt2 = true;
                    impulseSwt1 = true;
                    impulseSwt2 = true;
                    feedbackImg = new Image();
                    i = 0;
                    j = 0;
                    k = 1;
                    n = 0;
                    m = 0;
                    mouseOverAndOut = true;
                    sceneSelected = void 0;
                    ball1Sel1 = void 0;
                    ball2Sel1 = void 0;
                    ball1Sel2 = void 0;
                    ball2Sel2 = void 0;
                    correctAns = void 0;
                    drawnCol = void 0;
                    resFeedBack = void 0;
                    fbCongr = void 0;
                    ctxFeedback.clearRect(0, 0, canvasFeedback.width, canvasFeedback.height);
                    scene1.setBodiesCanvas1(n1BallScene1, ballCol1, n2BallScene1, ballCol2, ballRadius);
                    scene1.setBodiesCanvas2(0, ballCol1, 0, ballCol2, ballRadius);
                    scene2.setBodiesCanvas1(n1BallScene2, ballCol1, n2BallScene2, ballCol2, ballRadius);
                    scene2.setBodiesCanvas2(0, ballCol1, 0, ballCol2, ballRadius);
                    document.getElementById('impulse').disabled = true;
                    document.getElementById('draw').disabled = true;
                    document.getElementById('next').disabled = true;
                    document.getElementById('div1').style.borderColor = 'transparent';
                    document.getElementById('div3').style.borderColor = 'transparent';
                }
                next = false;
            }
            if (draw1 && drawSwt1 && sceneSelected == 1) {
                scene1.openDoorCanvas2(m);
                m++;
                if (m > 90) {
                    let n1 = 0,
                        n2 = 0,
                        tmpArray1 = Array(n1BallScene1).fill(1),
                        tmpArray2 = Array(n2BallScene1).fill(2),
                        tmpArray = [...tmpArray1, ...tmpArray2],
                        tmpSelectedElement = shuffleArray(tmpArray).slice(0, 1);
                    if (trialNr == 1 || trialNr == 4) {
                        drawnCol = ballCol1;
                        n1 = 1;
                    } else if (trialNr == 2 || trialNr == 3) {
                        drawnCol = ballCol2;
                        n2 = 1;
                    } else if (tmpSelectedElement == 1) {
                        drawnCol = ballCol1;
                        n1 = 1;
                    } else if (tmpSelectedElement == 2) {
                        drawnCol = ballCol2;
                        n2 = 1;
                    }
                    scene1.setBodiesCanvas2(n1, ballCol1, n2, ballCol2, ballRadius);
                    drawSwt1 = false;
                }
            }
            if (draw2 && drawSwt2 && sceneSelected == 2) {
                scene2.openDoorCanvas2(m);
                m++;
                if (m > 90) {
                    let n1 = 0,
                        n2 = 0,
                        tmpArray1 = Array(n1BallScene2).fill(1),
                        tmpArray2 = Array(n2BallScene2).fill(2),
                        tmpArray = [...tmpArray1, ...tmpArray2],
                        tmpSelectedElement = shuffleArray(tmpArray).slice(0, 1);
                    if (trialNr == 1 || trialNr == 4) {
                        drawnCol = ballCol1;
                        n1 = 1;
                    } else if (trialNr == 2 || trialNr == 3) {
                        drawnCol = ballCol2;
                        n2 = 1;
                    } else if (tmpSelectedElement == 1) {
                        drawnCol = ballCol1;
                        n1 = 1;
                    } else if (tmpSelectedElement == 2) {
                        drawnCol = ballCol2;
                        n2 = 1;
                    }
                    scene2.setBodiesCanvas2(n1, ballCol1, n2, ballCol2, ballRadius);
                    drawSwt2 = false;
                }
            }
            if (exit) {
                if (currentTrial && currentTrial.done) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen().catch(() => {
                            console.log('Unable to exit fullscreen. Sorry!');
                        });
                    }
                    else if (document.mozExitFullScreen) {
                        document.mozExitFullScreen();
                    }
                    else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                    else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    else {
                        console.log('Unable to exit fullscreen.');
                    }
                }
                scene1 = new Scene('canvas1', 'canvas2', sceneWidth, sceneHeight, 'circle', ballRadius, 'GhostWhite', 'GhostWhite', '', scale);
                scene2 = new Scene('canvas3', 'canvas4', sceneWidth, sceneHeight, 'circle', ballRadius, 'GhostWhite', 'GhostWhite', '', scale);
                start = false;
                finish = true;
                unmask = false;
                draw = false;
                sceneSelected = void 0;
                drawnCol = void 0;
                ctxFeedback.clearRect(0, 0, canvasFeedback.width, canvasFeedback.height);
                document.getElementById('impulse').disabled = true;
                document.getElementById('draw').disabled = true;
                document.getElementById('next').disabled = true;
                document.getElementById('div1').style.borderColor = 'transparent';
                document.getElementById('div3').style.borderColor = 'transparent';
                let byeImg = document.createElement('img');
                byeImg.src = './Images/bye.gif';
                divFiller.style = 'text-align:center';
                setTimeout(() => {
                    divFiller.appendChild(byeImg);
                    workBook = XLSX.utils.book_new();
                    workSheet = XLSX.utils.aoa_to_sheet(results, { cellDates: true });
                    XLSX.utils.book_append_sheet(workBook, workSheet, 'Results');
                    //XLSX.writeFile(workBook, fileName);
                }, 200);
                setTimeout(() => {
                    XLSX.writeFile(workBook, fileName);
                }, 500);
                /* setTimeout(() => {
                    open(location, '_self').close();
                }, 3000); */
                exit = false;
            }
            scene1.updateCanvas1();
            scene1.updateCanvas2();
            scene2.updateCanvas1();
            scene2.updateCanvas2();
            scene1.drawCanvas1();
            if (unmask) {
                j = j + n / 5e4;
                unmask = scene1.unmaskCanvas1(j, maskColor);
                if (!unmask) {
                    document.getElementById('impulse').disabled = false;
                }
                n++;
            }
            if (draw) {
                if (impulseSwt1) {
                    impulseAngle = 180 - impulseAngle;
                    scene1.setImpulseCanvas1(impulseAngle, impulsePower1);
                    scene1.updateCanvas1();
                    impulseSwt1 = false;
                }
                k = k - i / 5e2;
                draw1 = scene1.maskCanvas1(k, maskColor);
                i++;
            }
            if (!start && !finish) {
                //scene1.unmaskCanvas1(0, maskColor);
                //scene1.setBodiesCanvas1(0, '', 0, '', ballRadius);
                //scene1.setBodiesCanvas2(0, '', 0, '', ballRadius);
                exampleBall1 = new CircleTh(
                    'exampleBall1',
                    (canvas1.width * 0.5) / scale,
                    canvas1.height * 0.5 / scale, 0,
                    { x: (canvas1.width * 0.5) / scale, y: canvas1.height * 0.5 / scale },
                    expCol1, '', '', ballRadius / scale
                );
                exampleBall1.draw(ctx1, scale);
            }
            scene1.drawCanvas2();
            scene2.drawCanvas1();
            if (unmask) {
                scene2.unmaskCanvas1(j, maskColor);
            }
            if (draw) {
                if (impulseSwt2) {
                    impulseAngle = 180 - impulseAngle;
                    scene2.setImpulseCanvas1(impulseAngle, impulsePower2);
                    scene2.updateCanvas1();
                    impulseSwt2 = false;
                }
                draw2 = scene2.maskCanvas1(k, maskColor);
            }
            if (!start && !finish) {
                //scene2.unmaskCanvas1(0, maskColor);
                //scene2.setBodiesCanvas1(0, '', 0, '', ballRadius);
                //scene2.setBodiesCanvas2(0, '', 0, '', ballRadius);
                exampleBall2 = new CircleTh(
                    'exampleBall2',
                    canvas3.width * 0.5 / scale,
                    canvas3.height * 0.5 / scale, 0,
                    { x: canvas3.width * 0.5 / scale, y: canvas3.height * 0.5 / scale },
                    expCol2, '', '', ballRadius / scale
                );
                exampleBall2.draw(ctx3, scale);
            }
            scene2.drawCanvas2();
            if (typeof drawnCol !== 'undefined') {
                if (drawnCol == winCol) {
                    feedbackImg.src = './Images/satisfied.png';
                    audio = new Audio('./Audio/satisfied.mp3');
                    resFeedBack = 'positive';
                } else {
                    feedbackImg.src = './Images/sad.png';
                    audio = new Audio('./Audio/sad.mp3');
                    resFeedBack = 'negative';
                }
                if (feedback) {
                    feedbackImg.onload = setTimeout(() => {
                        ctxFeedback.drawImage(feedbackImg, 21, 21);
                        audio.play();
                        document.getElementById('impulse').disabled = true;
                        document.getElementById('draw').disabled = true;
                    }, 1000);
                    setTimeout(() => {
                        document.getElementById('next').disabled = false;
                    }, 6000);
                    if (sceneSelected == sceneCorrect) correctAns = 1;
                    else correctAns = 0;
                    if ((correctAns == 1 && resFeedBack == 'positive') || (correctAns == 0 && resFeedBack == 'negative')) {
                        fbCongr = 'congruent';
                    } else {
                        fbCongr = 'incongruent';
                    }
                    if (trialNr == 3 || trialNr == 4) {
                        correctAns = 'null';
                        fbCongr = 'null';
                    }
                    resTrial = [subjectId, age, sex, trialNr, n1BallScene1, n2BallScene1, n1BallScene2, n2BallScene2,
                        ballCol1, ballCol2, sceneSelected, sceneCorrect, correctAns, drawnCol, winCol, resFeedBack, fbCongr];
                    results.push(resTrial);
                    sceneClick = false;
                    feedback = false;
                }
                if (noFeedback) {
                    setTimeout(() => {
                        document.getElementById('impulse').disabled = true;
                        document.getElementById('draw').disabled = true;
                    }, 1000);
                    setTimeout(() => {
                        document.getElementById('next').disabled = false;
                    }, 2000);
                    correctAns = 'null';
                    resFeedBack = 'null';
                    fbCongr = 'null';
                    resTrial = [subjectId, age, sex, trialNr, n1BallScene1, n2BallScene1, n1BallScene2, n2BallScene2,
                        ballCol1, ballCol2, sceneSelected, sceneCorrect, correctAns, drawnCol, winCol, resFeedBack, fbCongr];
                    results.push(resTrial);
                    sceneClick = false;
                    noFeedback = false;
                }
            }
            if (!exit) {
                requestAnimFrame(loop);
            }
        })();
    }
    //}, false);
}

function exitExperiment() {
    const [sceneWidth, sceneHeight] = [500, 500],
        divFiller = document.getElementById('divFiller'),
        canvas1 = document.getElementById('canvas1'),
        canvas2 = document.getElementById('canvas2'),
        canvas3 = document.getElementById('canvas3'),
        canvas4 = document.getElementById('canvas4'),
        canvas1b = document.getElementById('canvas1b'),
        canvas2b = document.getElementById('canvas2b'),
        canvas2c = document.getElementById('canvas2c'),
        canvas3b = document.getElementById('canvas3b'),
        canvas4b = document.getElementById('canvas4b'),
        canvas4c = document.getElementById('canvas4c'),
        canvasFeedback = document.getElementById('canvasFeedback'),
        ctxFeedback = canvasFeedback.getContext('2d');
    let //scene1 = new Scene('canvas1', 'canvas2', sceneWidth, sceneHeight, 'circle'),
        //scene2 = new Scene('canvas3', 'canvas4', sceneWidth, sceneHeight, 'circle'),
        exit = true;

    canvas1.width = sceneWidth;
    canvas1.height = sceneHeight;
    canvas2.width = sceneWidth * 0.4;
    canvas2.height = sceneHeight * 0.2;
    canvas3.width = sceneWidth;
    canvas3.height = sceneHeight;
    canvas4.width = sceneWidth * 0.4;
    canvas4.height = sceneHeight * 0.2;
    canvas1b.width = canvas2.width;
    canvas1b.height = canvas2.height / 2;
    canvas2b.width = canvas2.width / 3;
    canvas2b.height = canvas2.width / 3;
    canvas2c.width = canvas2.width / 3;
    canvas2c.height = canvas2.width / 3;
    canvas3b.width = canvas2.width;
    canvas3b.height = canvas2.height / 2;
    canvas4b.width = canvas2.width / 3;
    canvas4b.height = canvas2.width / 3;
    canvas4c.width = canvas2.width / 3;
    canvas4c.height = canvas2.width / 3;
    canvasFeedback.width = 170;
    canvasFeedback.height = 170;
    divFiller.style.width = '170px';
    divFiller.style.height = '418px';

    if (true) {
        (function loop() {
            if (exit) {
                ctxFeedback.clearRect(0, 0, canvasFeedback.width, canvasFeedback.height);
                document.getElementById('impulse').disabled = true;
                document.getElementById('draw').disabled = true;
                document.getElementById('next').disabled = true;
                document.getElementById('div1').style.borderColor = 'transparent';
                document.getElementById('div3').style.borderColor = 'transparent';
                let byeImg = document.createElement('img');
                byeImg.src = './Images/bye.gif';
                divFiller.style = 'text-align:center';
                setTimeout(() => {
                    divFiller.appendChild(byeImg);
                }, 200);
                exit = false;
            }
            //scene1.drawCanvas1();
            //scene1.drawCanvas2();
            //scene2.drawCanvas1();
            //scene2.drawCanvas2();
            if (!exit) {
                requestAnimFrame(loop);
            }
        })();
    }
}

function inputDlg() {
    let bold, span, btn;
    inputWindow.document.body.append(Object.assign(inputWindow.document.createElement('div'), { id: 'inputWindow' }));
    inputWindow.document.getElementById('inputWindow').appendChild(
        Object.assign(inputWindow.document.createElement('form'), { id: 'inputForm' })
    );
    inputWindow.document.getElementById('inputForm').appendChild(
        Object.assign(inputWindow.document.createElement('ul'), { id: 'inputUl1' })
    );
    inputWindow.document.getElementById('inputUl1').appendChild(
        Object.assign(inputWindow.document.createElement('li'), { id: 'inputLi1' })
    );
    inputWindow.document.getElementById('inputLi1').appendChild(
        Object.assign(inputWindow.document.createElement('label'), { id: 'inputLabel1', for: 'subjectId' })
    );
    bold = inputWindow.document.createElement('b');
    bold.appendChild(inputWindow.document.createTextNode('Subject Id:'));
    inputWindow.document.getElementById('inputLabel1').appendChild(bold);
    inputWindow.document.getElementById('inputUl1').appendChild(
        Object.assign(inputWindow.document.createElement('li'), { id: 'inputLi2' })
    );
    inputWindow.document.getElementById('inputLi2').appendChild(
        Object.assign(inputWindow.document.createElement('input'),
            { type: 'text', name: 'subjectId', placeholder: 'E.g., 1', size: '14' })
    );
    inputWindow.document.getElementById('inputUl1').appendChild(inputWindow.document.createElement('br'));
    inputWindow.document.getElementById('inputUl1').appendChild(
        Object.assign(inputWindow.document.createElement('li'), { id: 'inputLi3' })
    );
    inputWindow.document.getElementById('inputLi3').appendChild(
        Object.assign(inputWindow.document.createElement('label'), { id: 'inputLabel2', for: 'age' })
    );
    bold = inputWindow.document.createElement('b');
    bold.appendChild(inputWindow.document.createTextNode('Age:'));
    inputWindow.document.getElementById('inputLabel2').appendChild(bold);
    inputWindow.document.getElementById('inputUl1').appendChild(
        Object.assign(inputWindow.document.createElement('li'), { id: 'inputLi4' })
    );
    inputWindow.document.getElementById('inputLi4').appendChild(
        Object.assign(inputWindow.document.createElement('input'),
            { type: 'text', name: 'age', placeholder: 'E.g., 3', size: '14' })
    );
    inputWindow.document.getElementById('inputUl1').appendChild(inputWindow.document.createElement('br'));
    inputWindow.document.getElementById('inputUl1').appendChild(
        Object.assign(inputWindow.document.createElement('li'), { id: 'inputLi5' })
    );
    inputWindow.document.getElementById('inputLi5').appendChild(
        Object.assign(inputWindow.document.createElement('label'), { id: 'inputLabel3', for: 'choice' })
    );
    bold = inputWindow.document.createElement('b');
    bold.appendChild(inputWindow.document.createTextNode('Sex:'));
    inputWindow.document.getElementById('inputLabel3').appendChild(bold);
    inputWindow.document.getElementById('inputUl1').appendChild(
        Object.assign(inputWindow.document.createElement('ul'), { id: 'inputUl2' })
    );
    inputWindow.document.getElementById('inputUl2').appendChild(
        Object.assign(document.createElement('li'), { id: 'inputLi6' })
    );
    inputWindow.document.getElementById('inputLi6').appendChild(
        Object.assign(inputWindow.document.createElement('input'),
            { type: 'radio', name: 'choice', value: 'male' })
    );
    span = inputWindow.document.createElement('span');
    span.appendChild(inputWindow.document.createTextNode('Male'));
    inputWindow.document.getElementById('inputLi6').appendChild(span);
    inputWindow.document.getElementById('inputUl2').appendChild(
        Object.assign(inputWindow.document.createElement('li'), { id: 'inputLi7' })
    );
    inputWindow.document.getElementById('inputLi7').appendChild(
        Object.assign(inputWindow.document.createElement('input'),
            { type: 'radio', name: 'choice', value: 'female' })
    );
    span = inputWindow.document.createElement('span');
    span.appendChild(inputWindow.document.createTextNode('Female'));
    inputWindow.document.getElementById('inputLi7').appendChild(span);
    inputWindow.document.getElementById('inputUl1').appendChild(inputWindow.document.createElement('br'));
    inputWindow.document.getElementById('inputUl1').appendChild(
        Object.assign(inputWindow.document.createElement('li'), { id: 'inputLi8' })
    );
    btn = inputWindow.document.createElement('button');
    btn.innerHTML = 'Cancel';
    inputWindow.document.getElementById('inputLi8').appendChild(
        Object.assign(btn, { id: 'inputButtonCanc' })
    );
    btn = inputWindow.document.createElement('button');
    btn.innerHTML = 'Ok';
    inputWindow.document.getElementById('inputLi8').appendChild(
        Object.assign(btn, { id: 'inputButtonOk' })
    );
}