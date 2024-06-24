import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Book } from '../interface/interface';
import { actionBook } from '../actions/actions';

export default function Books() {
    const data: any = useSelector(state => state);
    const dispatch = useDispatch();
    const [nameBook, setNameBook] = useState<string>('');
    const [nameUser, setNameUser] = useState<string>('');
    const [date1, setDate1] = useState<string>('');
    const [date2, setDate2] = useState<string>('');
    const [updatingBookId, setUpdatingBookId] = useState<number | null>(null);

    useEffect(() => {
        if (updatingBookId !== null) {
            const bookToUpdate = data.bookReducer.find((book: Book) => book.id === updatingBookId);
            if (bookToUpdate) {
                setNameBook(bookToUpdate.name);
                setNameUser(bookToUpdate.borrow);
                setDate1(bookToUpdate.pay);
                setDate2(bookToUpdate.student);
            }
        }
    }, [updatingBookId, data.bookReducer]);

    const handleUpdateStatus = (id: number) => {
        if (window.confirm("Bạn có muốn cập nhập trạng thái trả sách hay không?")) {
            dispatch(actionBook("UPDATE_STATUS", id));
        }
    }

    const handleDelete = (id: number) => {
        dispatch(actionBook("DELETE_BOOK", id));
    }

    const handleUpdate = (id: number) => {
        setUpdatingBookId(id);
    }

    const saveNameBook = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameBook(e.target.value);
    }

    const saveNameUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameUser(e.target.value);
    }

    const saveDate1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate1(e.target.value);
    }

    const saveDate2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate2(e.target.value);
    }

    const saveNewAdd = () => {
        if (updatingBookId === null) {
            const newBookAdd = {
                id: Math.floor(Math.random() * 9999999),
                name: nameBook,
                borrow: nameUser,
                pay: date1,
                student: date2,
                status: false
            };
            dispatch(actionBook("ADD_BOOK", newBookAdd));
        } else {
            const updatedBook = {
                id: updatingBookId,
                name: nameBook,
                borrow: nameUser,
                pay: date1,
                student: date2,
                status: false
            };
            dispatch(actionBook("UPDATE_BOOK", updatedBook));
            setUpdatingBookId(null);
        }
        setNameBook('');
        setNameUser('');
        setDate1('');
        setDate2('');
    }

    const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        let filterValue: boolean | null = null;
        if (selectedValue === "true") {
            filterValue = true;
        } else if (selectedValue === "false") {
            filterValue = false;
        }
        dispatch(actionBook("LOAD_BOOK_SELECT", filterValue));
    }

    return (
        <div>
            <div>
                Thêm thông tin
            </div>
            <div>
                <label htmlFor="">Tên sách</label>
                <input value={nameBook} onChange={saveNameBook} type="text" />
            </div>
            <div>
                <label htmlFor="">Người mượn</label>
                <input value={nameUser} onChange={saveNameUser} type="text" />
            </div>
            <div>
                <label htmlFor="">Ngày mượn</label>
                <input value={date1} onChange={saveDate1} type="text" />
            </div>
            <div>
                <label htmlFor="">Ngày trả</label>
                <input value={date2} onChange={saveDate2} type="text" />
            </div>
            <button onClick={saveNewAdd}>{updatingBookId === null ? 'Lưu' : 'Cập nhật'}</button>
            <div>
                <select onChange={changeSelect} name="" id="">
                    <option value="">Lọc theo trạng thái</option>
                    <option value="true">Đã trả</option>
                    <option value="false">Chưa trả</option>
                </select>
            </div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên sách</th>
                        <th>Người mượn</th>
                        <th>Ngày mượn</th>
                        <th>Ngày trả</th>
                        <th>Trạng thái</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {data.bookReducer.map((book: Book, index: number) => (
                        <tr key={book.id}>
                            <td>{index + 1}</td>
                            <td>{book.name}</td>
                            <td>{book.student}</td>
                            <td>{book.borrow}</td>
                            <td>{book.pay}</td>
                            <td onClick={() => handleUpdateStatus(book.id)}>
                                {book.status ? <button>Đã trả</button> : <button>Chưa trả</button>}
                            </td>
                            <td>
                                <button onClick={() => handleUpdate(book.id)}>Sửa</button>
                                <button onClick={() => handleDelete(book.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}