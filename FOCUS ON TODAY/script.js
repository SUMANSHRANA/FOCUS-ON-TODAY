const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressValue = document.querySelector('.progress-value')
const progressUpdate=document.querySelector('.progrees-label')
// const allGoals=JSON.parse( localStorage.getItem('allGoals'))||{
 
//     first:{
//         name:'',
//         completed:false,
//     },
//     second:{
//         name:'',
//         completed:false,
//     },
//     third:{
//         name:'',
//         completed:false,
//     }
// }

//it will tell us the toal completed goals
// const completedgoalscount=Object.values(allGoals) this much part will coinvert this objkect into arrray

const allGoals=JSON.parse( localStorage.getItem('allGoals'))||{}
let completedgoalscount=Object.values(allGoals).filter((goal)=>goal.completed).length
progressValue.style.width=`${completedgoalscount/3 *100}%`
  progressValue.firstElementChild.innerText=`${completedgoalscount}/3 completed`
//for each loop is loiya use kar raha ha kyunki checkboxlist ka andar bahut saara checkbox honga

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
  ]

  progressUpdate.innerText=allQuotes[completedgoalscount]


checkBoxList.forEach((checkbox)=>{

    checkbox.addEventListener('click',(e)=>{
        
        const allGoalsAdded=[...inputFields].every((input)=>{
          return input.value
        })

        if(allGoalsAdded){
            checkbox.parentElement.classList.toggle('completed')

           const inputId=checkbox.nextElementSibling.id           
           allGoals[inputId].completed=!allGoals[inputId].completed
           completedgoalscount=Object.values(allGoals).filter((goal)=>goal.completed).length
           progressValue.style.width=`${completedgoalscount/3 *100}%`
          progressValue.firstElementChild.innerText=`${completedgoalscount}/3 completed`
          progressUpdate.innerText=allQuotes[completedgoalscount]
           localStorage.setItem('allGoals',JSON.stringify(allGoals))
        }
        else{
            errorLabel.classList.add('error-label2')
        }
    })
})

//now we will add focus on inout
inputFields.forEach((input)=>{

    if(allGoals[input.id]){
   input.value=allGoals[input.id].name;
    
   if(allGoals[input.id].completed){
    input.parentElement.classList.add('completed')
   }
}
    

    input.addEventListener('focus',(e)=>{
        errorLabel.classList.remove('error-label2')
    })

    input.addEventListener('input',(e)=>{
        if(allGoals[input.id] && allGoals[input.id].completed){
            input.value=allGoals[input.id].name
            return
        }
        if(allGoals[input.id]){
        allGoals[input.id].name=input.value
        }else{
            allGoals[input.id]={
         name:input.value,
         completed:false,
            }
        }
        
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
    })

    
})