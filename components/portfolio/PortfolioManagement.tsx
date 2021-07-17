import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';
import HighlightedH1 from '../../lib/HighlightedH1';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import PortfolioForm from './PortfolioForm';
import PortfolioItem from './PortfolioItem';
import classes from './PortfolioManagement.module.scss';
import PortfolioModal from './PortfolioModal';
import PortfolioConfirmDelete from './PortfolioConfirmDelete';

interface PortfolioItem {
  _id: ObjectId | string;
  date: Date | string;
  title: string;
  url: string;
  githubUrl: string;
  description: string;
  tags: string[];
  image: string;
  thumbnail: string;
  slug: string;
}

const PortfolioManagement = (props: any) => {
  const [portfolioItems, setPortfolioItems] = useState<any>(null);
  const [portfolioItem, setPortfolioItem] = useState<PortfolioItem | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState('');

  useEffect(() => {
    setPortfolioItems(props.portfolioItems);
  }, [props.portfolioItems]);

  useEffect(() => {
    let timer: any;
    if (response && !error) {
      timer = setInterval(() => {
        setResponse('');
      }, 3000);
    }

    return () => clearInterval(timer);
  }, [response, error]);

  const handleReview = (portfolioItem: PortfolioItem) => {
    setPortfolioItem(portfolioItem);
    setToggleModal(!toggleModal);
  };

  const handleSubmit = async () => {
    const method = editMode ? 'PUT' : 'POST';
    const body = JSON.stringify(portfolioItem);

    const response = await fetch('/api/portfolio', {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(true);
      setResponse(data.message);
      return;
    }

    if (editMode) {
      const newItems: any = portfolioItems?.map((item: any) => {
        if (item._id === data.data._id) {
          return data.data;
        }
        return item;
      });

      setPortfolioItems(newItems);
    } else {
      const newPortfolioItems = [data.data, ...portfolioItems];
      setPortfolioItems(newPortfolioItems);
    }

    setError(false);
    setPortfolioItem(null);
    setEditMode(false);
    setResponse(data.message);
  };

  const handleClick = async (id: string) => {
    const result = await portfolioItems?.find((item: any) => item._id === id);
    result.date = new Date(result.date).toISOString();

    setPortfolioItem(result);
    setEditMode(true);
  };

  const deleteItemConfirm = (id: string) => {
    setToggleDeleteModal(!toggleDeleteModal);
    setDeleteTarget(id);
  };

  const deleteItem = async () => {
    const body = JSON.stringify({ _id: deleteTarget });

    const response = await fetch('/api/portfolio', {
      method: 'DELETE',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(true);
      setResponse(data.message);
      return;
    }

    setError(false);
    setResponse(data.message);

    const newPortfolioItems: any = portfolioItems?.filter(
      (item: any) => item._id !== deleteTarget
    );

    setPortfolioItems(newPortfolioItems);
    setDeleteTarget(null);
  };

  return (
    <div>
      <div>
        <HighlightedH1
          content={editMode ? portfolioItem?.title.toLowerCase() : 'new item'}
        />
      </div>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <PortfolioForm
            handleReview={handleReview}
            portfolioItem={portfolioItem}
          />
          <div>
            {!!response.length && (
              <p className={!error ? classes.success : classes.error}>
                {response}
              </p>
            )}
          </div>
        </div>
        <div className={`${classes.content} ${classes.items}`}>
          {portfolioItems &&
            portfolioItems.map((item: any) => {
              return (
                <div key={item._id} className={classes.clickItem}>
                  <div>
                    <PortfolioItem item={item} edit={true} />
                  </div>
                  <div className={classes.itemTools}>
                    <div onClick={() => handleClick(item._id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </div>
                    <div
                      className={classes.delete}
                      onClick={() => deleteItemConfirm(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {toggleModal && (
        <PortfolioModal
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          portfolioItem={portfolioItem}
          handleSubmit={handleSubmit}
        />
      )}
      {toggleDeleteModal && (
        <PortfolioConfirmDelete
          openModul={toggleDeleteModal}
          setOpenModul={setToggleDeleteModal}
          deleteFn={deleteItem}
        />
      )}
    </div>
  );
};

export default PortfolioManagement;
