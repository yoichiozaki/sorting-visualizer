import React from 'react';
import './visualizer.css';
import '../algo/algo';
import { doBubbleSort, doHeapSort, doMergeSort, doQuickSort } from '../algo/algo';

const ANIMATION_SPEED_MS = 1;
const ARRAY_SIZE = 200;

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];

        for (let i = 0; i < ARRAY_SIZE; i++) {
            let element = randomIntegerRange(5, 600);
            array.push(element);
        }

        this.setState({ array });
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let idx = 0; idx < arrayBars.length; idx++) {
            arrayBars[idx].style.backgroundColor = "pink";
        }
    }

    bubbleSort() {
        // const jsSortedArray = this.state.array.slice().sort((a, b) => {
        //     if (a < b) return -1;
        //     if (b < a) return 1;
        //     return 0;
        // });
        const sortingAnimations = doBubbleSort(this.state.array.slice());
        // const sortedArray = sortingAnimations[sortingAnimations.length - 1]["result"];

        // console.log(isSame(jsSortedArray, sortedArray));

        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < sortingAnimations.length - 1; i++) {
            const animation = sortingAnimations[i];
            switch (animation["operation"]) {
                case "compare":
                    // console.log("compare");
                    const cbar1Idx = animation["target"][0];
                    const cbar2Idx = animation["target"][1];
                    const cbar1Style = arrayBars[cbar1Idx].style;
                    const cbar2Style = arrayBars[cbar2Idx].style;
                    setTimeout(() => {
                        cbar1Style.backgroundColor = "red";
                        cbar2Style.backgroundColor = "red";
                    }, i * ANIMATION_SPEED_MS);
                    setTimeout(() => {
                        cbar1Style.backgroundColor = "pink";
                        cbar2Style.backgroundColor = "pink";
                    }, (i + 1) * ANIMATION_SPEED_MS);
                    break;
                case "swap":
                    // console.log("swap");
                    const sbar1Idx = animation["target"][0][0];
                    const sbar1Height = animation["target"][0][1];
                    const sbar2Idx = animation["target"][1][0];
                    const sbar2Height = animation["target"][1][1];
                    const sbar1Style = arrayBars[sbar1Idx].style;
                    const sbar2Style = arrayBars[sbar2Idx].style;
                    setTimeout(() => {
                        sbar1Style.height = `${sbar2Height}px`
                        sbar2Style.height = `${sbar1Height}px`
                        sbar1Style.backgroundColor = "green";
                        sbar2Style.backgroundColor = "green";
                    }, i * ANIMATION_SPEED_MS);
                    setTimeout(() => {
                        sbar1Style.backgroundColor = "pink";
                        sbar2Style.backgroundColor = "pink";
                    }, (i + 1) * ANIMATION_SPEED_MS);
                    break;
                case "fix":
                    // console.log("fix");
                    const fbarIdx = animation["target"][0];
                    const fbarStyle = arrayBars[fbarIdx].style;
                    setTimeout(() => {
                        fbarStyle.backgroundColor = "turquoise";
                    }, i * ANIMATION_SPEED_MS);
                    break;
                default:
                    console.log("Error: must not reach here");
                    break;
            }
        }

        // setTimeout(() => {
        //     for (let idx = 0; idx < arrayBars.length; idx++) {
        //         arrayBars[idx].style.backgroundColor = "pink";
        //     }
        // }, (sortingAnimations.length + 1) * 10);
    }

    testBubbleSort() {
        for (let _ = 0; _ < 1; _++) {
            const array = [];

            for (let i = 0; i < 20; i++) {
                let element = randomIntegerRange(5, 600);
                array.push(element);
            }

            const jsSortedArray = array.slice().sort((a, b) => {
                if (a < b) return -1;
                if (b < a) return 1;
                return 0;
            });
            const sortingAnimations = doBubbleSort(array.slice());
            const sortedArray = sortingAnimations[sortingAnimations.length - 1]["result"];

            console.log(isSame(jsSortedArray, sortedArray));
        }
    }

    mergeSort() {
        const jsSortedArray = this.state.array.slice().sort((a, b) => {
            if (a < b) return -1;
            if (b < a) return 1;
            return 0;
        });
        const sortingAnimations = doMergeSort(this.state.array.slice());
        const sortedArray = sortingAnimations[sortingAnimations.length - 1]["result"];

        console.log(isSame(jsSortedArray, sortedArray));
    }

    quickSort() {
        // const jsSortedArray = this.state.array.slice().sort((a, b) => {
        //     if (a < b) return -1;
        //     if (b < a) return 1;
        //     return 0;
        // });

        const sortingAnimations = doQuickSort(this.state.array.slice());
        // const sortedArray = sortingAnimations[sortingAnimations.length - 1]["result"];

        // console.log(isSame(jsSortedArray, sortedArray));

        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < sortingAnimations.length - 1; i++) {
            const animation = sortingAnimations[i];
            switch (animation["operation"]) {
                case "pivot":
                    // animations.push({ "operation": "pivot", "target": [pivotIndex, pivot] });
                    const pbarIdx = animation["target"][0];
                    const pbar = arrayBars[pbarIdx];
                    const pbarStyle = pbar.style;
                    setTimeout(() => {
                        pbarStyle.backgroundColor = "yellow";
                    }, i * ANIMATION_SPEED_MS);
                    break;
                case "compare":
                    // animations.push({ "operation": "compare", "target": [i, array[i], pivot] });
                    const cbarIdx = animation["target"][0];
                    const cbar = arrayBars[cbarIdx];
                    const cbarStyle = cbar.style;
                    setTimeout(() => {
                        cbarStyle.backgroundColor = "red";
                    }, i * ANIMATION_SPEED_MS);
                    setTimeout(() => {
                        cbarStyle.backgroundColor = "pink";
                    }, (i + 1) * ANIMATION_SPEED_MS);
                    break;
                case "swap":
                    // animations.push({ "operation": "swap", "target": [[i, array[i]], [j, array[j]], [pivotIndex, pivot]] });
                    const sbar1Idx = animation["target"][0][0];
                    const sbar1Height = animation["target"][0][1];
                    const sbar2Idx = animation["target"][1][0];
                    const sbar2Height = animation["target"][1][1];
                    const spivotIdx = animation["target"][2][0];
                    // const spivotHeight = animation["target"][2][1];
                    const sbar1Style = arrayBars[sbar1Idx].style;
                    const sbar2Style = arrayBars[sbar2Idx].style;
                    switch (spivotIdx) {
                        case sbar1Idx:
                            setTimeout(() => {
                                sbar1Style.height = `${sbar2Height}px`
                                sbar2Style.height = `${sbar1Height}px`
                                sbar1Style.backgroundColor = "green";
                                sbar2Style.backgroundColor = "yellow";
                            }, i * ANIMATION_SPEED_MS);
                            setTimeout(() => {
                                sbar1Style.backgroundColor = "pink";
                                sbar2Style.backgroundColor = "yellow";
                            }, (i + 1) * ANIMATION_SPEED_MS);
                            break;
                        case sbar2Idx:
                            setTimeout(() => {
                                sbar1Style.height = `${sbar2Height}px`
                                sbar2Style.height = `${sbar1Height}px`
                                sbar1Style.backgroundColor = "yellow";
                                sbar2Style.backgroundColor = "green";
                            }, i * ANIMATION_SPEED_MS);
                            setTimeout(() => {
                                sbar1Style.backgroundColor = "yellow";
                                sbar2Style.backgroundColor = "pink";
                            }, (i + 1) * ANIMATION_SPEED_MS);
                            break;
                        default:
                            setTimeout(() => {
                                sbar1Style.height = `${sbar2Height}px`
                                sbar2Style.height = `${sbar1Height}px`
                                sbar1Style.backgroundColor = "green";
                                sbar2Style.backgroundColor = "green";
                            }, i * ANIMATION_SPEED_MS);
                            setTimeout(() => {
                                sbar1Style.backgroundColor = "pink";
                                sbar2Style.backgroundColor = "pink";
                            }, (i + 1) * ANIMATION_SPEED_MS);
                            break;
                    }
                    break;
                case "fix":
                    // animations.push({ "operation": "fix", "target": i - 1 });
                    const fbarIdx = animation["target"];
                    const fbarStyle = arrayBars[fbarIdx].style;
                    setTimeout(() => {
                        for (let i = 0; i < arrayBars.length; i++) {
                            if (i === fbarIdx) {
                                fbarStyle.backgroundColor = "turquoise";
                            } else {
                                if (arrayBars[i].style.backgroundColor !== "turquoise") {
                                    arrayBars[i].style.backgroundColor = "pink";
                                }
                            }
                        }

                    }, i * ANIMATION_SPEED_MS);
                    break;
                default:
                    console.log("Error: must not reach here");
                    break;
            }
        }

    }

    heapSort() {
        const jsSortedArray = this.state.array.slice().sort((a, b) => {
            if (a < b) return -1;
            if (b < a) return 1;
            return 0;
        });
        const sortingAnimations = doHeapSort(this.state.array.slice());
        const sortedArray = sortingAnimations[sortingAnimations.length - 1]["result"];

        console.log(isSame(jsSortedArray, sortedArray));
    }

    render() {
        const { array } = this.state;

        return (
            <div className="visualizer-cointainer">
                <div className="button-container">
                    <button className="button-generate-new-array" onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.testBubbleSort()}>Test Bubble Sort</button>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{ height: `${value}px`, backgroundColor: "pink" }}></div>
                    ))}
                </div>
            </div>
        )
    }
}

// Returns random integer in range from <= x <= to
function randomIntegerRange(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function isSame(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}