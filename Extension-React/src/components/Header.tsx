const Header: React.FC<{ pageIcon: string; pageDomain: string }> = ({
    pageIcon,
    pageDomain,
}) => (
    <div className="flex items-center gap-4 border-border border-b-2 pb-4 mb-4">
        <img src={pageIcon} alt="Page Icon" className="w-8 h-8" />
        <p className="text-lg font-bold text-primary">{pageDomain}</p>
    </div>
);

export default Header;
