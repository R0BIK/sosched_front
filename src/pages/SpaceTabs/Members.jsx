import {useState} from "react";

import Badge from "../../components/Badges/Badge.jsx";

const tags1 = [
    {id: "1", name: "IP-33", members: "20", tag: "ІП-33", tagColor: "red"},
    {id: "2", name: "IP-31", members: "21", tag: "ІП-31", tagColor: "green"},
    {id: "3", name: "IP-32", members: "22", tag: "ІП-32", tagColor: "yellow"},
    {id: "4", name: "IP-33", members: "19", tag: "ІП-33", tagColor: "pink"},
];

const members1 = [
    {id: "1", FirstName: "Yehor", LAST_NAME: "Tsapurda", Patronymic: "Dmitrovich", EMAIL: "example@gmail.com", Role: "Student", tags: tags1},
    {id: "2", FirstName: "Dima", LAST_NAME: "Edrov", Patronymic: "", EMAIL: "example@gmail.com", Role: "Student", tags: tags1}
];

export default function Members() {
    const [members, setMembers] = useState(members1);


    return (
        <div className="py-5 px-9 w-full overflow-auto">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold text-main-black">Учасники</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
            </div>
            <div className="mt-8 w-full">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-300 font-noto">
                        <thead>
                        <tr>
                            <th
                                scope="col"
                                className="w-9/20 py-3.5 text-left text-sm font-semibold text-main-black"
                            >
                                Учасники – {members.length}
                            </th>
                            <th scope="col" className="w-1/4 py-3.5 text-center text-sm font-semibold text-main-black">
                                Роль
                            </th>
                            <th scope="col" className="w-1/4 py-3.5 text-center text-sm font-semibold text-main-black">
                                Теги
                            </th>
                            <th scope="col" className="w-1/20 py-3.5">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-transparent">
                        {members.map((member) => (
                            <tr key={member.id} className="w-full">
                                <td className="w-9/20 py-4 text-sm break-all text-main-black">
                                    <div className="flex justify-start items-center gap-4">
                                        <div className="min-h-10 min-w-10 rounded-full bg-red-400">

                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-main-black text-lg">
                                                {member.LastName} {member.FirstName} {member.Patronymic}
                                            </p>
                                            <a href={`mailto:${member.Email}`} className="hover:underline text-second-text text-xs">
                                                {member.Email}
                                            </a>
                                        </div>
                                    </div>
                                </td>
                                <td className="w-1/4 py-4 text-sm break-all text-second-text text-center">{member.Role}</td>
                                <td className="w-1/4 py-4 text-center text-sm whitespace-nowrap text-main-black">
                                    <div className="flex gap-2 justify-center flex-wrap">
                                        {member.tags.map((tag) => (
                                            <Badge key={tag.id} text={tag.tag} color={tag.tagColor} />
                                        ))}
                                    </div>
                                </td>
                                <td className="w-1/20 text-right">

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}