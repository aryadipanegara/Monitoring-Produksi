"use client";
import { useState } from "react";
import { Menu, Group, Center, Burger, Container } from "@mantine/core";
import { FiChevronDown } from "react-icons/fi";

const links = [
  { link: "/products", label: "Product" },
  { link: "/materials", label: "Materials" },
  { link: "/Pengiriman", label: "Pengiriman" },

  {
    link: "#1",
    label: "Support",
    links: [
      { link: "/slipgaji", label: "SlipGaji" },
      { link: "/pegawai", label: "Pegawai" },
    ],
  },
];

export function HeaderMenu() {
  const [opened, setOpened] = useState(false);

  const toggle = () => {
    setOpened(!opened);
  };

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className="flex items-center px-3 py-2 rounded text-sm font-medium text-black hover:text-white hover:bg-black"
            >
              <span className="mr-1">{link.label}</span>
              <FiChevronDown className="w-4 h-4" />
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className="block px-3 py-2 rounded text-sm font-medium text-black hover:text-white hover:bg-black"
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className="mb-10 text-black shadow-lg">
      <Container size="md">
        <div className="h-14 flex justify-between items-center">
          <div className="text-lg font-bold">PT.Tritek</div>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}
