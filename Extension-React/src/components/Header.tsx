import Dropdown from "./Dropdown";

const Header: React.FC<{}> = () => {

    return (
        <header className="flex p-4 items-center justify-between">
            <div className="left flex gap-4 flex-rows">
                <a href="https://joinsyrup.com" target="_blank"><img className="w-8 h-8 rounded-[5px]" src="/icons/Syrup.png" alt="" /></a>
                <h1 className="text-2xl font-bold">Syrup</h1>
            </div>
            <Dropdown />
        </header>
    );
}

export default Header;
