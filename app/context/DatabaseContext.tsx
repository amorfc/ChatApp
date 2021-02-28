// import React, { useContext, useState } from "react";
// import { Database, sqliteDatabase } from "../database/Database"; // optional: see comments below

// // Initialize our Database context.
// // Any implementation that matches the Database interface will do. We will go with our
// // sqliteDatabase for this app.
// const DatabaseContext = React.createContext<Database | undefined>(undefined);


// // The provider which enables accessing our list context from it's component tree.
// export const DatabaseContextProvider: React.FunctionComponent = function({ children }) {


//   return (
//     <DatabaseContext.Provider value={sqliteDatabase}>
//       {children}
//     </DatabaseContext.Provider>
//   );

//   // Alternatively, try the InMemoryDatabase instead by replacing `sqliteDatabase` above
//   // with `inMemoryDatabase`.
// };

// // Hook to pull our database object from the context and return it.
// // Inspired by the Kent C. Dodds approach to using context: https://kentcdodds.com/blog/how-to-use-react-context-effectively
// export function useDatabase(): Database {
//   const database = useContext(DatabaseContext);
//   if (database === undefined) {
//     throw new Error("useDatabase must be used within a ListContextProvider");
//   }
//   return database;
// }

