import React, { useEffect, useState, useCallback } from 'react'
import { RouteComponentProps } from 'react-router';

import SignIn from '@/pages/SignIn';
import Widget from '@/components/Widget';
import Chat from '@/components/Chat';

import style from "@styles/pages/Main.module.scss"

// interface Props {
//     item: {
//         count: number,
//         id: number,
//     },
//     onUpdate: (id: number) => void
// }

// const Test = React.memo(({ item, onUpdate }: Props) => {
//     console.log('render test');
//     return (
//         <span onClick={() => onUpdate(item.id)}>{item.count}</span>
//     )
// })

// const Counter = () => {
//     const [count, setCount] = useState(0);
//     return (
//         <>
//             Count: {count}
//             <button onClick={() => setCount(0)}>Reset</button>
//             {/* <button onClick={() => {
//                 debugger
//                 setCount(count + 1);
//                 setCount(count + 1)
//             }
//             }>+</button> */}
//             <button onClick={() => {
//                 console.log(count);
//                 debugger
//                 setCount(prevCount => {
//                     debugger
//                     return prevCount + 1
//                 });
//                 console.log(count);
//                 debugger
//                 setCount(prevCount => {
//                     debugger
//                     return prevCount + 1
//                 });
//             }
//             }>+</button>
//         </>
//     );
// }

// let currentList: Array<{ count: number, id: number }>;

const Main = (props: RouteComponentProps): JSX.Element => {
    // const [list, setList] = useState<Array<{ count: number, id: number }>>([
    //     {
    //         count: 0,
    //         id: 0,
    //     },
    //     {
    //         count: 0,
    //         id: 1,
    //     },
    //     {
    //         count: 0,
    //         id: 2,
    //     }
    // ]);

    const [state, setState] = useState({
        list: [
            {
                name: 'Виджет 1',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, eius.',
                createdDate: '10-12-2015',
                author: 'Name 1'
            },
            {
                name: 'Виджет 2',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, eius.',
                createdDate: '31-01-2016',
                author: 'Name 2'
            },
            {
                name: 'Виджет 3',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus necessitatibus non molestiae soluta dolorem facere temporibus explicabo fugit magnam eos fuga iste illo, quidem officia corporis esse voluptatum alias ab.',
                createdDate: '06-06-2015',
                author: 'Name 3'
            }
        ]
    })

    // const update = useCallback(
    //     (id: number) => {
    //         // let newList = list.map(item => {
    //         //     // if (item.id === id) {
    //         //     // return { ...item, count: item.count + 1 };
    //         //     // }
    //         //     return item;
    //         // });
    //         // setList(newList);

    //         setList((prevState) => {
    //             return prevState.map(item => {
    //                 if (item.id === id) {
    //                     return { ...item, count: ++item.count };
    //                 }
    //                 return item;
    //             });
    //         });
    //     },
    //     [],
    // )

    // useEffect(() => {
    //     console.log(currentList == list)
    //     debugger;
    //     return () => {
    //         currentList = list;
    //         console.log(currentList == list)
    //         debugger;
    //     }
    // }, [list])

    return (
        <main className={style.main}>
            {/* <div className="grid">
                {
                    state.list && state.list.map((item, index) => {
                        return (
                            <Widget {...item} key={index} />
                        )
                    })
                }
            </div>

            <Chat /> */}
            {/* {
                list.map(item => (
                    <Test item={item} key={item.id} onUpdate={update} />
                ))
            } */}
            {/* <Counter /> */}
        </main>
    )
}

export default Main
