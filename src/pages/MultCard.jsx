import { useEffect, useRef, useState } from "react";
import CloseIcon from "../assets/svg/CloseIcon";
import { Form, Input } from 'antd';

function MultCard() {
  const [mult, setMult] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [form] = Form.useForm();

  const AddRef = useRef();

  // Modal ochish / yopish
  function AddMenuOpen() {
    AddRef.current.classList.add("active");
  }

  function CloseMenuOpen() {
    AddRef.current.classList.remove("active");
    setEditingData(null); // edit tugaganda tozalab qo‘yamiz
    form.resetFields();
  }

  // Ma'lumotlarni olish
  useEffect(() => {
    fetch("https://ceed8a646c7fba8b.mokky.dev/multcard")
      .then((res) => res.json())
      .then((data) => setMult(data))
      .catch((err) => console.log("Xato", err));
  }, []);

  // Qo‘shish yoki yangilash
  async function handleSave() {
    const values = form.getFieldsValue();

    if (editingData) {
      // Agar edit rejimida bo‘lsa (PUT)
      try {
        const res = await fetch(`https://ceed8a646c7fba8b.mokky.dev/multcard/${editingData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const updated = await res.json();
        setMult(mult.map(item => (item.id === editingData.id ? updated : item)));
        CloseMenuOpen();
      } catch (err) {
        console.error("Yangilashda xato:", err);
      }
    } else {
      // Agar yangi ma'lumot qo‘shilsa (POST)
      try {
        const res = await fetch("https://ceed8a646c7fba8b.mokky.dev/multcard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();
        setMult([...mult, data]);
        CloseMenuOpen();
      } catch (err) {
        console.error("Qo‘shishda xato:", err);
      }
    }
  }

  // Edit bosilganda formani to‘ldirish
  function handleEdit(el) {
    setEditingData(el);
    form.setFieldsValue(el);
    AddMenuOpen();
  }

  // Delete qilish
  async function handleDelete(id) {
    try {
      await fetch(`https://ceed8a646c7fba8b.mokky.dev/multcard/${id}`, {
        method: "DELETE",
      });
      setMult(mult.filter(item => item.id !== id));
    } catch (err) {
      console.error("O‘chirishda xato:", err);
    }
  }

  return (
    <section className="multCard">
      <div className="multCard-title-add">
        <h1 className="multCard-title">Multfilm qo'shish</h1>
        <button className="multCard-add" onClick={AddMenuOpen}>+ Add</button>
      </div>

      {/* Modal */}
      <div className="multCard-add-menu" ref={AddRef}>
        <button className='multCard-add-menu-close' onClick={CloseMenuOpen}>
          <CloseIcon />
        </button>
        <div className="multCard-add-menu-inp">
          <Form form={form}>
            <Form.Item name="img" className='multCard-add-menu-form'>
              <Input placeholder="Image url" className="multCard-add-menu-input" />
            </Form.Item>
            <Form.Item name="title" className='multCard-add-menu-form'>
              <Input placeholder="Multfilm nomi" className="multCard-add-menu-input" />
            </Form.Item>
            <Form.Item name="lang" className='multCard-add-menu-form'>
              <Input placeholder="Qaysi tilda" className="multCard-add-menu-input" />
            </Form.Item>
            <Form.Item name="type" className='multCard-add-menu-form'>
              <Input placeholder="Type: drive" className="multCard-add-menu-input" />
            </Form.Item>
            <Form.Item name="videoUrl" className='multCard-add-menu-form'>
              <Input placeholder="Video url" className="multCard-add-menu-input" />
            </Form.Item>
          </Form>
        </div>
        <button className="multCard-add-menu-added" onClick={handleSave}>
          {editingData ? "Yangilash" : "Saqlash"}
        </button>
      </div>

      {/* Cardlar */}
      <div className="multCard-cards">
        {mult.map((item) => (
          <div className="multCard-cards-item" key={item.id}>
            <div className="multCard-cards-item-img">
              <img src={item.img} alt="" />
            </div>
            <h1 className="multCard-cards-item-title">{item.title}</h1>
            <div className="multCard-cards-item-btn">
              <button className="multCard-cards-item-edit" onClick={() => handleEdit(item)}>Edit</button>
              <button className="multCard-cards-item-delete" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MultCard;