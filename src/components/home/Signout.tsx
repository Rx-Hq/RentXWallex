import React from 'react';
import { signOut } from '../../../auth';

const Signout = () => {
  return (
    <>
      <a href="#" className="logout">
        <form
          action={async () => {
            'use server';

            await signOut();
          }}
        >
          <div className="flex justify-end ">
            <button className="nav-item" type="submit">
              Sign out
            </button>
          </div>
        </form>
      </a>
    </>
  );
};

export default Signout;
