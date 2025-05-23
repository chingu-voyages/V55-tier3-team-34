import {Component1Icon} from "@radix-ui/react-icons";


export function ChinguAsyncLogo() {
    return(
        <div className="flex items-center gap-2">
            <Component1Icon className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-extrabold">
                <span className="text-primary">Chingu</span>
                <span className="text-black-text ">Async.</span>
            </h1>
        </div>
    )
}
