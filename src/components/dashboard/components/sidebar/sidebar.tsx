import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { redirect, usePathname } from "next/navigation";
import { applicationCheck } from "../../../../../actions/Application";
import { useRouter } from "next/navigation";
import { getMembership } from "../../../../../actions/membership";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [buttonDisable, setButtonDisable] = useState(true);
  const [isMember, setIsMember] = useState(false);
  useEffect(() => {
    applicationCheck().then((data: any) => {
      console.log(data);
      if (data === null) {
        setButtonDisable(true);
      } else {
        if (data.isApproved === false) {
          setButtonDisable(true);
        } else {
          setButtonDisable(false);
        }
      }
    });
    getMembership().then((data) => {
      if (data?.Membership_Info.length! > 0) {
        if (data?.Membership_Info[0].membershipExpireDate! > new Date()) {
          setIsMember(true);
        }
      }
    });
  }, []);
  return (
    <>
      {!buttonDisable && (
        <aside className="h-screen z-[202] sticky top-0">
          {collapsed ? (
            <div className={Sidebar.Overlay()} onClick={setCollapsed} />
          ) : null}
          <div
            className={Sidebar({
              collapsed: collapsed,
            })}
          >
            <div className={Sidebar.Header()}>
              <CompaniesDropdown />
            </div>
            <div className="flex flex-col justify-between h-full">
              <div className={Sidebar.Body()}>
                <SidebarMenu title="">
                  <SidebarItem
                    title="Dashboard"
                    icon={<HomeIcon />}
                    isActive={pathname === "/home"}
                    href={buttonDisable ? "application" : "/home"}
                  />
                  <SidebarItem
                    isActive={pathname === "/rentalHome"}
                    title="My Apartment"
                    icon={<AccountsIcon />}
                    href={buttonDisable ? "application" : "/rentalHome"}
                  />
                  <SidebarItem
                    isActive={pathname === "/membership"}
                    title="Membership"
                    icon={<PaymentsIcon />}
                    href={"/membership"}
                  />
                  {isMember && (
                    <>
                      <SidebarItem
                        isActive={pathname === "/payments"}
                        title="Payments"
                        icon={<PaymentsIcon />}
                        href={"/payments"}
                      />
                      <SidebarItem
                        isActive={pathname === "/transactions"}
                        title="Transactions"
                        icon={<PaymentsIcon />}
                        href={"/transactions"}
                      />
                    </>
                  )}

                  <SidebarItem
                    isActive={pathname === "/customers"}
                    title="Credit History"
                    icon={<CustomersIcon />}
                  />
                  <SidebarItem
                    isActive={pathname === "/referAndEarn"}
                    title="Refer & Earn"
                    icon={<ProductsIcon />}
                    href={"/referAndEarn"}
                  />
                </SidebarMenu>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
