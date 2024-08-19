import logo from "../assets/logo.png"

function Footer() {
    return (
        <div className="bg-gray-600 py-10">
            <div className="md:container md:flex-row mx-auto flex justify-between items-center flex-col gap-4">
                {/* <h3 className="text-white text-3xl font-bold tracking-tight">Coco & Sun Travel and Tours</h3> */}
                <img src={logo} alt="" className="h-28 w-auto" />
                <div className="flex flex-col gap-1 text-yellow-300">
                    <p>Contact Number: 0939-252-0573</p>
                    <p>Email: sales.cocosun@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default Footer