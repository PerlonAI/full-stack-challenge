'use server'

export async function checkUserInputAction(form: FormData){
  'use server'
  const userInput = form.get('userInput[0][0]') as string;
  console.log({userInput });
}
