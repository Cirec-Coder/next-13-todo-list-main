import { deleteAll } from "@/lib/dbUtils";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteAllButton = () => {
  const router = useRouter();
  const openModal = () => {
    const elem = document.getElementById("my_modal_1") as HTMLDialogElement;
    elem?.showModal();
  };
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        onClick={() => {
          openModal();
        }}
        title="Delete the entire database"
        className="btn  btn-error sm:btn-sm btn-xs"
      >
        <Trash2Icon
          width="1.2em"
          height="1.2em"
        />
        {/* <span className="hidden sm:block">Delete All</span> */}
      </button>
      <dialog
        id="my_modal_1"
        className="modal w-full"
      >
        <div className="modal-box shadow-black shadow-lg">
          <h3 className="font-bold text-lg">Delete All Todos!</h3>
          <p className="py-4">Do you really want to delete all the items ?</p>
          <form
            method="dialog"
            className="modal-backdrop"
          >
            {/* if there is a button in form, it will close the modal */}
            <button
              type="button"
              onClick={async () => {
                const elem = document.getElementById(
                  "my_modal_1"
                ) as HTMLDialogElement;
                elem?.close();
              deleteAll().then(() => {
                  router.push("/");
                  window.location.replace("/")
                })
                       }}
              className="btn btn-error mb-4"
            >
              Yes
            </button>
            <button className="btn btn-success">No</button>
            {/* for closing the modal when press esc or click outside the form */}
            <button className="hidden">N</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default DeleteAllButton;
