"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Badge,
} from "@nextui-org/react";
import { BiChevronDown, BiTrophy } from "react-icons/bi";
import {
  Challenge,
  columns,
  typeOptions,
  statusOptions,
  challenges,
} from "src/lib/dummy/data";
import { CgAdd, CgSearch } from "react-icons/cg";
import { FiMoreHorizontal } from "react-icons/fi";
import Link from "next/link";

const ROWS_PER_PAGE = 5;
const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "description",
  "status",
  "type",
  "points",
];

export default function MyChallengesTable() {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    let filtered = [...challenges];

    if (filterValue) {
      filtered = filtered.filter((challenge) =>
        challenge.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter.length > 0) {
      filtered = filtered.filter((challenge) =>
        statusFilter.includes(challenge.status)
      );
    }

    if (typeFilter.length > 0) {
      filtered = filtered.filter((challenge) =>
        typeFilter.includes(challenge.type)
      );
    }

    return filtered;
  }, [filterValue, statusFilter, typeFilter]);

  const pages = Math.ceil(filteredItems.length / ROWS_PER_PAGE);
  const items = filteredItems.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const onSearchChange = useCallback((value: string) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const toggleStatusFilter = useCallback((status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
    setPage(1);
  }, []);

  const toggleTypeFilter = useCallback((type: string) => {
    setTypeFilter((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setPage(1);
  }, []);

  const renderCell = useCallback((challenge: Challenge, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2">
            <BiTrophy className="h-4 w-4 text-yellow-500" />
            <div>
              <p className="font-medium">{challenge.name}</p>
              <p className="text-sm text-stone-400">{challenge.description}</p>
            </div>
          </div>
        );
      case "status":
        return (
          <div className=" w-full items-center justify-center">
            <Chip
              variant="bordered"
              className=" mx-auto w-full  "
              color={`${challenge.status === "completed" ? "success" : "warning"}`}
            >
              {challenge.status || "upcoming"}
            </Chip>
          </div>
        );
      case "points":
        return (
          <div className="font-medium">
            {challenge.points.toLocaleString()} pts
          </div>
        );
      case "startDate":
        return new Date(challenge.startDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      case "participants":
        return challenge.participants.toLocaleString();
      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" isIconOnly className="">
                <FiMoreHorizontal className="h-4 w-4 text-stone-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>View Details</DropdownItem>
              <DropdownItem>Leave Challenge</DropdownItem>
              <DropdownItem>Share</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return challenge[columnKey as keyof Challenge];
    }
  }, []);

  return (
    <div className="w-full ">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3 items-center">
            <Input
              variant="bordered"
              className="w-full max-w-64"
              placeholder="Search challenges..."
              value={filterValue}
              onChange={(e) => onSearchChange(e.target.value)}
              startContent={<CgSearch className="text-default-300" />}
            />
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  Status <BiChevronDown className="ml-2" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {statusOptions.map((status) => (
                  <DropdownItem
                    key={status.uid}
                    className="capitalize"
                    onSelect={() => toggleStatusFilter(status.uid)}
                  >
                    <input
                      type="checkbox"
                      checked={statusFilter.includes(status.uid)}
                      className="mr-2"
                      readOnly
                    />
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  Type <BiChevronDown className="ml-2" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {typeOptions.map((type) => (
                  <DropdownItem
                    key={type.uid}
                    className="capitalize"
                    onSelect={() => toggleTypeFilter(type.uid)}
                  >
                    <input
                      type="checkbox"
                      checked={typeFilter.includes(type.uid)}
                      className="mr-2"
                      readOnly
                    />
                    {type.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <Button as={Link} href="/user/userId/challenges" color="primary">
            Join New Challenge
          </Button>
        </div>
        <div className="w-full bg-stone-700 p-6 rounded-lg overflow-x-auto">
          <Table
            isCompact
            aria-label="my challenges table with custom cells"
            isHeaderSticky
            className="w-full !bg-stone-700 !p-0 "
            removeWrapper
            classNames={{
              base: "base-  ", // table wrapper
              table: "table-  ",
              thead: "thead-  ",
              tbody: "tbody-classes ",
              tr: "tr-classes ",
              th: "th- !bg-stone-500 text-white ",
              td: "td-classes ",
              tfoot: "tfoot-classes ",
              sortIcon: "sort-icon-classes ",
              emptyWrapper: "empty-wrapper- ",
            }}
          >
            <TableHeader columns={columns} className="">
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "participants" ? "center" : "start"}
                  //   allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={items}>
              {(item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={column.uid}>
                      {renderCell(item, column.uid)}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {items.length} of {filteredItems.length} challenges
          </p>
          <div className="flex gap-2">
            <Button
              variant="bordered"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="bordered"
              size="sm"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
