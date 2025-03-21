import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowUp, FiArrowDown, FiRefreshCcw, FiSearch } from 'react-icons/fi';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter =()=>{
    const categories =[
        {categoryId:1, categoryName:"Electronics"},
        {categoryId:2, categoryName:"Clothing"},
        {categoryId:3, categoryName:"Furniture"},
        {categoryId:4, categoryName:"Books"},
        {categoryId:5, categoryName:"Toys"},
    ];

    const [searchParams]= useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathName = useLocation().pathname;
    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() =>{
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);setSortOrder(currentSortOrder);setSearchTerm(currentSearchTerm);

    },[searchParams]);

    useEffect(()=>{
        const handler = setTimeout(()=>{
            if (searchTerm){
                searchParams.set("keyword", searchTerm);
            }else{
                searchParams.delete("keyword");
            }
            navigate(`${pathName}?${searchParams.toString()}`);
        }, 700);
        return ()=>{
            clearTimeout(handler);
        };
    },[searchParams,searchTerm,navigate,pathName]);


    const handleCategoryChange = (event) =>{
        const selectCategory = event.target.value;
        if(selectCategory === "all"){
            params.delete("category");
        }else{
            params.set("category", selectCategory);
        }
        navigate(`${pathName}?${params}`);
        setCategory(event.target.value);
    };
    const toggleSortOrder = ()=>{
        setSortOrder((preOrder) =>{
            const newOrder = (preOrder === "asc") ? "desc" : "asc";
            params.set("sortby", newOrder);
            navigate(`${pathName}?${params}`);
            return newOrder;
        })
    };
    const handleClearFilter = ()=>{
        navigate({pathname : window.location.pathname});
    }
    
    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/*Search Box*/}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input type="text" placeholder="Search Products" className="border border-gray-300 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
                <FiSearch className="absolute left-3 text-slate-800 size={20}"/>
            </div>

            {/*Select Category*/}
            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <FormControl variant="outlined" size="small"className="text-slate-800 border-slate-700">
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select labelId="category-select-label" value={category} onChange={handleCategoryChange} label="Category" className="min-w-[120px] text-slate-800 border-slate-700">
                        <MenuItem value="all">All</MenuItem> 
                        {categories.map((index) =>(
                            <MenuItem key={index.categoryId} value={index.categoryName}>{index.categoryName}</MenuItem> 
                        ))}
                    </Select>
                </FormControl>
                {/*Sort Button & Clear Filter*/}
                <Tooltip title="Sorted price by: Asc">
                    <Button variant="contained" onClick={toggleSortOrder} color="primary" className="flex items-center gap-2 h-10">
                        Sort By {sortOrder === "asc" ? (<FiArrowUp size={20}/>):(<FiArrowDown size={20}/>)}
                    </Button>
                </Tooltip>
                <button onClick={handleClearFilter} className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none ">
                    <FiRefreshCcw className="font-semibold" size={16}/>
                    <span className="font-semibold">Clear Filter</span>
                </button>
            </div>
        </div>
    )
}
export default Filter;