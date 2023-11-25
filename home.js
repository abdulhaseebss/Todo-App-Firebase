import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, Timestamp, query, orderBy, deleteDoc, doc, updateDoc, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


const form = document.querySelector('#form');
const title = document.querySelector('#title');
const card = document.querySelector('#div');
const profileImage = document.querySelector('#profileImage');
const username = document.querySelector('#username');
const logout = document.querySelector('#logout');


//user login or logout function
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const q = query(collection(db, "user"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            username.innerHTML = doc.data().name
            profileImage.src = doc.data().profileUrl
        });
        getDataFromFirestore(user.uid)
    } else {
        window.location = 'index.html'
    }
});


logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'index.html'
    }).catch((error) => {
        console.log(error);
    });
})


let arr = [];

function renderPost() {
    card.innerHTML = ''
    arr.map((item) => {
        card.innerHTML += `
        <div class="card mt-2">
        <div class="card-body">
            <p><span class="h4 title">Title: </span>${item.title}</p>
            <button type="button" id="delete">Delete</button>
            <button type="button" id="update">Edit</button>
        </div><hr/>
    </div>`
    })

    const del = document.querySelectorAll('#delete');
    const upd = document.querySelectorAll('#update');

    del.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('delete called', arr[index]);
            await deleteDoc(doc(db, "posts", arr[index].docId))
                .then(() => {
                    console.log('post deleted');
                    arr.splice(index, 1);
                    renderPost()
                });
        })
    })
    upd.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            console.log('update called', arr[index]);
            const updatedTitle = prompt( 'enter new Title' , arr[index].title);
            await updateDoc(doc(db, "posts", arr[index].docId), {
                title: updatedTitle
            });
            arr[index].title = updatedTitle;
            renderPost()

        })
    })
}



async function getDataFromFirestore(uid) {
    arr.length = 0;
    const q = await query(collection(db, "posts"), orderBy('postDate', 'desc') , where('uid' , '==' , uid));
    // const userUid = await auth.currentUser
    console.log(uid);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        arr.push({ ...doc.data(), docId: doc.id });
    });
    console.log(arr);
    renderPost();
}





form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        const postObj = {
            title: title.value,
            uid: auth.currentUser.uid,
            postDate: Timestamp.fromDate(new Date())
        }
        const docRef = await addDoc(collection(db, "posts"), postObj);
        console.log("Document written with ID: ", docRef.id);
        postObj.docId = docRef.id;
        arr = [postObj, ...arr];
        console.log(arr);
        renderPost();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});





