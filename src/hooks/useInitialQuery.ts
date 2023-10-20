// import { useSearchParams } from "react-router-dom";
// interface IData {
//   [key: string]: any;
// }

// //Some states are objects, and I have only one ID in the query, so I have to find that ID, retrieve the full object, and then transform it into the desired structure.
// const useInitialQuery = () => {
//   let [searchParams] = useSearchParams();
//   const initialQuery = (
//     data: IData[],
//     searchParamsName: string | number | boolean
//   ) => {
//     const findObjectQuery = data.find(
//       (g: any) => g.id.toString() === searchParamsName
//     );
//     const transformObject = (inputObject: IData | undefined) => ({
//       id: inputObject?.id,
//       value: inputObject?.name,
//     });

//     return transformObject(findObjectQuery);
//   };
//   const initialQueryMentorTa = (data: IData[], name: string) => {
//     console.log(name, data);
//     const findObjectQuery = data.find(
//       (g: any) => g.id.toString() === searchParams.get(name)
//     );
//     const transformObject = (inputObject: IData | undefined) => ({
//       id: inputObject?.id,
//       value: inputObject?.firstName + " " + inputObject?.lastName,
//     });

//     return transformObject(findObjectQuery);
//   };

//   return { initialQuery, initialQueryMentorTa };
// };

// export default useInitialQuery;


import { useMemo } from "react";

interface IData {
  [key: string]: any;
}

//Some states are objects, and I have only one ID in the query, so I have to find that ID, retrieve the full object, and then transform it into the desired structure.

const useInitialQuery = () => {
  const initialQuery = useMemo(
    () => (data: IData[]|undefined, searchParamsVal: string | number | boolean) => {
      console.log("hoooook:", { data }, { searchParamsVal });
      const findObjectQuery = data?.find(
        (g: any) => g.id.toString() === searchParamsVal
      );
      const transformObject = (inputObject: IData | undefined) => ({
        id: inputObject?.id,
        value: inputObject?.name,
      });

      return transformObject(findObjectQuery);
    },
    []
  );

  const initialQueryMentorTa = useMemo(
    () => (data: IData[], searchParamsVal: string | number | boolean) => {
      // console.log("hoooook:", { data }, { searchParamsVal });
      const findObjectQuery = data.find(
        (g: any) => g.userId.toString() === searchParamsVal
      );
      const transformObject = (inputObject: IData | undefined) => ({
        id: inputObject?.id,
        value: inputObject?.firstName + " " + inputObject?.lastName,
      });
      console.log({findObjectQuery})
      console.log({ transformObject: transformObject(findObjectQuery) });
      return transformObject(findObjectQuery);
    },
    []
  );
  // const initialQueryMentorTa = (data: IData[], name: string) => {
  //       console.log(name, data);
  //       const findObjectQuery = data.find(
  //         (g: any) => g.id.toString() === searchParams.get(name)
  //       );
  //       const transformObject = (inputObject: IData | undefined) => ({
  //         id: inputObject?.id,
  //         value: inputObject?.firstName + " " + inputObject?.lastName,
  //       });
    
  //       return transformObject(findObjectQuery);
  //     };

  const initialQueryWithoutTransform = useMemo(
    () => (data: IData[], searchParamsVal: string | number | boolean) => {
      const findObjectQuery = data.find(
        (g: any) => g.id.toString() === searchParamsVal
      );
      return findObjectQuery;
    },
    []
  );

  return { initialQuery, initialQueryMentorTa, initialQueryWithoutTransform };
};

export default useInitialQuery;
