const button = document.querySelector('.button');

button.onclick = function() {
    //sort cells
    const bubleCell = document.getElementById('buble_cell');
    const selectionCell = document.getElementById('selection_cell');
    const quickCell = document.getElementById('quick_cell');
    const mergeCell = document.getElementById('merge_cell');
    //get value from input
    const value = Number(document.querySelector('.generateNumbers').value);
    const generateNumbers = [];
    const map = {};
    while(generateNumbers.length < value){
        let number = Math.floor(Math.random() * value);
        if(!map[number]) {
            generateNumbers.push(number);
            map[number] = true;
        }
    }
    if(generateNumbers.length) {
        bubleCell.innerHTML = `${timerBySortType([...generateNumbers],sortBubble)} ms`;
        selectionCell.innerHTML =`${timerBySortType([...generateNumbers],selectionSort)} ms`;
        quickCell.innerHTML = `${timerBySortType([...generateNumbers],quickSort)} ms`;
        mergeCell.innerHTML = `${timerBySortType([...generateNumbers],mergeSort )} ms`
    }
}



function timerBySortType(array,sortType) {
    const start = new Date();
    sortType(array)
    const end = new Date();
    const time = end - start;
    return time;
}



const sortBubble = (array) => {
    for(let i = 0; i< array.length; i++) {
        for(let j=0; j < array.length - 1 - i; j++) {
            if(array[j] > array[j + 1]) {
                const buff = array[j];
                array[j] = array[j + 1];
                array[j + 1] = buff;
            }

        }
    }
    return array;
}

const selectionSort = (array) => {
    function getSmall(array) {
        let smallest = array[0];
        let smallest_index = 0;
        for(let i = 1; i< array.length; i++) {
            if(array[i]<smallest) {
                smallest=array[i];
                smallest_index=i;
            }
        }
        return smallest_index;
    }
    const newArray = [];
    const N = array.length
    for(let i=0; i< N; i++) {
        let smallest = getSmall(array);
        newArray.push(array[smallest]);

        array.splice(smallest, 1);
    }
    return newArray;
}




function quickSort(array) {
    if(array.length < 2) {
        return array;
    }
    const index = Math.floor(Math.random() * array.length);
    const currentItem = array[index];
    
    const more = [];
    const less=[];

    for(let i=0; i<array.length; i++) {
        if(i === index) {
            continue
        }
        if(array[i] > currentItem) {
            more.push(array[i]);
        }else{
            less.push(array[i]);
        }
        
    }
    return [...quickSort(less), currentItem, ...quickSort(more)]
    
}

function mergeSort(arr) {
    function merge(arrFirst, arrSecond){
        const arrSort = [];
        let i = 0;
        let j = 0;
        while (i < arrFirst.length && j < arrSecond.length) {
            arrSort.push((arrFirst[i] < arrSecond[j]) ?arrFirst[i++] : arrSecond[j++]);
        }
        
        return [
            ...arrSort,
            ...arrFirst.slice(i),
            ...arrSecond.slice(j)
        ];
    };

    if (!arr || !arr.length) {
        return null;
    }
    if (arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const arrLeft = arr.slice(0, middle);
    const arrRight = arr.slice(middle);
    return merge(mergeSort(arrLeft), mergeSort(arrRight));
   
};