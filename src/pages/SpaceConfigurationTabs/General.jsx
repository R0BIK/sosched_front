import InputBox from "../../components/BasicInputs/InputBox.jsx";
import InputArea from "../../components/BasicInputs/InputArea.jsx";

export default function General() {
    return (
        <div className="px-30 py-5 flex flex-col gap-20 w-full">
            <div className="flex w-full gap-20">
                <div className="w-1/2">
                    <InputBox name="Назва" placeholder="Київський політехнічний інститут імені Ігоря Сікорського" />
                </div>
                <div className="w-1/2">
                    <InputBox name="Скорочена назва" placeholder="КПІ" />
                </div>
            </div>
            <div className="flex w-full gap-20">
                <div className="w-1/2">
                    <InputBox name="Адреса" placeholder="м. Київ, вул. Пушкніна, буд. 20" />
                </div>
                <div className="w-1/2">
                    <InputBox name="Веб-сайт" placeholder="https://example.com" />
                </div>
            </div>
            <InputArea name={"Опис"} placeholder={"Национальный технический университет Украины «Киевский политехнический институт имени Игоря Сикорского» — один из самых крупных украинских университетов, основанный в 1898 году."} />
        </div>
    )
}