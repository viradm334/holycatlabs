'use client'

export default function Button({text, type}){
    const styles = {
        primary: 'outline-none text-white rounded-md bg-teal-500 px-3 py-2 font-semibold hover:bg-teal-600 transition cursor-pointer',
        secondary: 'outline-1 outline-teal-500 bg-white rounded-md px-3 py-2 text-teal-500 font-semibold cursor-pointer',
    }

    const selectedClass = styles[type];

    return (<button className={`${selectedClass}`}>
        {text}
    </button>)
}