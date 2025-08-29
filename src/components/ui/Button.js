'use client'

export default function Button({text, type="button", variant, onClick}){
    const styles = {
        primary: 'outline-none text-white rounded-md bg-teal-500 px-3 py-2 font-semibold hover:bg-teal-600 transition cursor-pointer',
        secondary: 'outline-1 outline-teal-500 bg-white rounded-md px-3 py-2 text-teal-500 font-semibold cursor-pointer',
    }

    const selectedClass = styles[variant];

    return (<button className={`${selectedClass}`} type={type} onClick={onClick}>
        {text}
    </button>)
}