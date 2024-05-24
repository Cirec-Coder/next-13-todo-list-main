import { countTodos, deleteAll, deleteByCiteria } from "@/lib/dbUtils";
import { capitalize } from "@/lib/utils";
import {
  LayoutListIcon,
  ListChecksIcon,
  ListTodoIcon,
  Trash2Icon,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

const buildConfirmationMessage = async (
  search: string,
  filter: string,
  setCount: (count: number) => void
): Promise<ReactElement> => {
  try {
    const countTd = await countTodos(search, filter);
    setCount(countTd);
    return (
      <>
        Are you sure you want to delete the
        <span className="text-red-500 text-xl font-bold"> {countTd}</span> Todos
        that represent the following search criteria. <br />
        Filter :{" "}
        <span className="text-green-500 font-bold">
          {capitalize(filter)}
        </span>{" "}
        Todos <br />
        {search ? (
          <span>
            Which contains the string : "{" "}
            <span className="text-green-500 font-bold">{search}</span> " in the
            title
          </span>
        ) : (
          <span className="text-red-500 font-bold">no search criteria</span>
        )}
      </>
    );
  } catch (error) {
    // Gérer l'erreur comme tu le souhaites, par exemple en retournant un message d'erreur
    return (
      <>
        Erreur lors de la récupération du nombre de todos pour la recherche $
        {search}
      </>
    );
  }
};

const getFilterIcon = (filter: string): ReactElement => {
  switch (filter) {
    case "all":
      return (
        <ListTodoIcon
          width="1.2em"
          height="1.2em"
          className="sm:hidden"
        />
      );
    case "active":
      return (
        <LayoutListIcon
          width="1.2em"
          height="1.2em"
          className="sm:hidden"
        />
      );
    case "completed":
      return (
        <ListChecksIcon
          width="1.2em"
          height="1.2em"
          className="sm:hidden"
        />
      );
      default : return <></>; 
  }
};

const DeleteByCriteriaButton = () => {
  const params = useSearchParams();
  const search = params.get("search") || "";
  const filter = params.get("filter") || "all";
  const router = useRouter();
  const [message, setMessage] = useState<ReactElement>(<></>);
  const [count, setCount] = useState(0);
  const openModal = () => {
    const elem = document.getElementById("criteria_modal") as HTMLDialogElement;
    elem?.showModal();
  };

  useEffect(() => {
    (async () => {
      setMessage(await buildConfirmationMessage(search, filter, setCount));
    })();
  }, [search, filter]);

  return count ? (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        onClick={() => {
          openModal();
        }}
        className="flex btn btn-outline btn-error sm:btn-sm btn-xs mx-1"
      >
        <Trash2Icon
          width="1.2em"
          height="1.2em"
        />
        {getFilterIcon(filter)}
        <span className="hidden sm:block">Delete {count} Todos</span>
      </button>
      <dialog
        id="criteria_modal"
        className="modal w-full"
      >
        <div className="modal-box shadow-black shadow-lg">
          <h3 className="font-bold text-lg">Delete Todos!</h3>
          <p className="py-4">{message}</p>
          <form
            method="dialog"
            className="modal-backdrop"
          >
            {/* if there is a button in form, it will close the modal */}
            <button
              type="button"
              onClick={async () => {
                const elem = document.getElementById(
                  "criteria_modal"
                ) as HTMLDialogElement;
                elem?.close();
                deleteByCiteria(search, filter).then(() => {
                  router.push("/");
                  window.location.replace("/");
                });
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
  ) : (
    <></>
  );
};

export default DeleteByCriteriaButton;
