.
├── app.vue
├── assets
│   └── css
│       ├── 01-settings
│       │   ├── 01-settings.css
│       │   ├── borders.css
│       │   ├── color-shades.css
│       │   ├── layout.css
│       │   ├── motion.css
│       │   ├── palette.css
│       │   ├── shadows.css
│       │   └── typography.css
│       ├── 02-tools
│       │   └── _tools.css
│       ├── 03-generic
│       │   └── _generic.css
│       ├── 04-elements
│       │   └── _elements.css
│       ├── 05-objects
│       │   └── _objects.css
│       ├── 06-components
│       │   └── _components.css
│       ├── 07-utilities
│       │   └── _utilities.css
│       ├── main.css
│       └── vendors
├── CLAUDE.md
├── components
│   ├── app
│   │   ├── AppSidebar.vue
│   │   ├── NavMain.vue
│   │   ├── NavProjects.vue
│   │   ├── NavUser.vue
│   │   └── TeamSwitcher.vue
│   └── ui
│       ├── accordion
│       │   ├── Accordion.vue
│       │   ├── AccordionContent.vue
│       │   ├── AccordionItem.vue
│       │   ├── AccordionTrigger.vue
│       │   └── index.ts
│       ├── avatar
│       │   ├── Avatar.vue
│       │   ├── AvatarFallback.vue
│       │   ├── AvatarImage.vue
│       │   └── index.ts
│       ├── badge
│       │   ├── Badge.vue
│       │   └── index.ts
│       ├── breadcrumb
│       │   ├── Breadcrumb.vue
│       │   ├── BreadcrumbEllipsis.vue
│       │   ├── BreadcrumbItem.vue
│       │   ├── BreadcrumbLink.vue
│       │   ├── BreadcrumbList.vue
│       │   ├── BreadcrumbPage.vue
│       │   ├── BreadcrumbSeparator.vue
│       │   └── index.ts
│       ├── button
│       │   ├── Button.vue
│       │   └── index.ts
│       ├── calendar
│       │   ├── Calendar.vue
│       │   ├── CalendarCell.vue
│       │   ├── CalendarCellTrigger.vue
│       │   ├── CalendarGrid.vue
│       │   ├── CalendarGridBody.vue
│       │   ├── CalendarGridHead.vue
│       │   ├── CalendarGridRow.vue
│       │   ├── CalendarHeadCell.vue
│       │   ├── CalendarHeader.vue
│       │   ├── CalendarHeading.vue
│       │   ├── CalendarNextButton.vue
│       │   ├── CalendarPrevButton.vue
│       │   └── index.ts
│       ├── card
│       │   ├── Card.vue
│       │   ├── CardAction.vue
│       │   ├── CardContent.vue
│       │   ├── CardDescription.vue
│       │   ├── CardFooter.vue
│       │   ├── CardHeader.vue
│       │   ├── CardTitle.vue
│       │   └── index.ts
│       ├── carousel
│       │   ├── Carousel.vue
│       │   ├── CarouselContent.vue
│       │   ├── CarouselItem.vue
│       │   ├── CarouselNext.vue
│       │   ├── CarouselPrevious.vue
│       │   ├── index.ts
│       │   ├── interface.ts
│       │   └── useCarousel.ts
│       ├── collapsible
│       │   ├── Collapsible.vue
│       │   ├── CollapsibleContent.vue
│       │   ├── CollapsibleTrigger.vue
│       │   └── index.ts
│       ├── dialog
│       │   ├── Dialog.vue
│       │   ├── DialogClose.vue
│       │   ├── DialogContent.vue
│       │   ├── DialogDescription.vue
│       │   ├── DialogFooter.vue
│       │   ├── DialogHeader.vue
│       │   ├── DialogOverlay.vue
│       │   ├── DialogScrollContent.vue
│       │   ├── DialogTitle.vue
│       │   ├── DialogTrigger.vue
│       │   └── index.ts
│       ├── drawer
│       │   ├── Drawer.vue
│       │   ├── DrawerClose.vue
│       │   ├── DrawerContent.vue
│       │   ├── DrawerDescription.vue
│       │   ├── DrawerFooter.vue
│       │   ├── DrawerHeader.vue
│       │   ├── DrawerOverlay.vue
│       │   ├── DrawerTitle.vue
│       │   ├── DrawerTrigger.vue
│       │   └── index.ts
│       ├── dropdown-menu
│       │   ├── DropdownMenu.vue
│       │   ├── DropdownMenuCheckboxItem.vue
│       │   ├── DropdownMenuContent.vue
│       │   ├── DropdownMenuGroup.vue
│       │   ├── DropdownMenuItem.vue
│       │   ├── DropdownMenuLabel.vue
│       │   ├── DropdownMenuRadioGroup.vue
│       │   ├── DropdownMenuRadioItem.vue
│       │   ├── DropdownMenuSeparator.vue
│       │   ├── DropdownMenuShortcut.vue
│       │   ├── DropdownMenuSub.vue
│       │   ├── DropdownMenuSubContent.vue
│       │   ├── DropdownMenuSubTrigger.vue
│       │   ├── DropdownMenuTrigger.vue
│       │   └── index.ts
│       ├── form
│       │   ├── FormControl.vue
│       │   ├── FormDescription.vue
│       │   ├── FormItem.vue
│       │   ├── FormLabel.vue
│       │   ├── FormMessage.vue
│       │   ├── index.ts
│       │   ├── injectionKeys.ts
│       │   └── useFormField.ts
│       ├── hover-card
│       │   ├── HoverCard.vue
│       │   ├── HoverCardContent.vue
│       │   ├── HoverCardTrigger.vue
│       │   └── index.ts
│       ├── input
│       │   ├── index.ts
│       │   └── Input.vue
│       ├── label
│       │   ├── index.ts
│       │   └── Label.vue
│       ├── native-select
│       │   ├── index.ts
│       │   ├── NativeSelect.vue
│       │   ├── NativeSelectOptGroup.vue
│       │   └── NativeSelectOption.vue
│       ├── navigation-menu
│       │   ├── index.ts
│       │   ├── NavigationMenu.vue
│       │   ├── NavigationMenuContent.vue
│       │   ├── NavigationMenuIndicator.vue
│       │   ├── NavigationMenuItem.vue
│       │   ├── NavigationMenuLink.vue
│       │   ├── NavigationMenuList.vue
│       │   ├── NavigationMenuTrigger.vue
│       │   └── NavigationMenuViewport.vue
│       ├── pagination
│       │   ├── index.ts
│       │   ├── Pagination.vue
│       │   ├── PaginationContent.vue
│       │   ├── PaginationEllipsis.vue
│       │   ├── PaginationFirst.vue
│       │   ├── PaginationItem.vue
│       │   ├── PaginationLast.vue
│       │   ├── PaginationNext.vue
│       │   └── PaginationPrevious.vue
│       ├── popover
│       │   ├── index.ts
│       │   ├── Popover.vue
│       │   ├── PopoverAnchor.vue
│       │   ├── PopoverContent.vue
│       │   └── PopoverTrigger.vue
│       ├── scroll-area
│       │   ├── index.ts
│       │   ├── ScrollArea.vue
│       │   └── ScrollBar.vue
│       ├── select
│       │   ├── index.ts
│       │   ├── Select.vue
│       │   ├── SelectContent.vue
│       │   ├── SelectGroup.vue
│       │   ├── SelectItem.vue
│       │   ├── SelectItemText.vue
│       │   ├── SelectLabel.vue
│       │   ├── SelectScrollDownButton.vue
│       │   ├── SelectScrollUpButton.vue
│       │   ├── SelectSeparator.vue
│       │   ├── SelectTrigger.vue
│       │   └── SelectValue.vue
│       ├── separator
│       │   ├── index.ts
│       │   └── Separator.vue
│       ├── sheet
│       │   ├── index.ts
│       │   ├── Sheet.vue
│       │   ├── SheetClose.vue
│       │   ├── SheetContent.vue
│       │   ├── SheetDescription.vue
│       │   ├── SheetFooter.vue
│       │   ├── SheetHeader.vue
│       │   ├── SheetOverlay.vue
│       │   ├── SheetTitle.vue
│       │   └── SheetTrigger.vue
│       ├── sidebar
│       │   ├── index.ts
│       │   ├── Sidebar.vue
│       │   ├── SidebarContent.vue
│       │   ├── SidebarFooter.vue
│       │   ├── SidebarGroup.vue
│       │   ├── SidebarGroupAction.vue
│       │   ├── SidebarGroupContent.vue
│       │   ├── SidebarGroupLabel.vue
│       │   ├── SidebarHeader.vue
│       │   ├── SidebarInput.vue
│       │   ├── SidebarInset.vue
│       │   ├── SidebarMenu.vue
│       │   ├── SidebarMenuAction.vue
│       │   ├── SidebarMenuBadge.vue
│       │   ├── SidebarMenuButton.vue
│       │   ├── SidebarMenuButtonChild.vue
│       │   ├── SidebarMenuItem.vue
│       │   ├── SidebarMenuSkeleton.vue
│       │   ├── SidebarMenuSub.vue
│       │   ├── SidebarMenuSubButton.vue
│       │   ├── SidebarMenuSubItem.vue
│       │   ├── SidebarProvider.vue
│       │   ├── SidebarRail.vue
│       │   ├── SidebarSeparator.vue
│       │   ├── SidebarTrigger.vue
│       │   └── utils.ts
│       ├── skeleton
│       │   ├── index.ts
│       │   └── Skeleton.vue
│       ├── sonner
│       │   ├── index.ts
│       │   └── Sonner.vue
│       ├── switch
│       │   ├── index.ts
│       │   └── Switch.vue
│       ├── table
│       │   ├── index.ts
│       │   ├── Table.vue
│       │   ├── TableBody.vue
│       │   ├── TableCaption.vue
│       │   ├── TableCell.vue
│       │   ├── TableEmpty.vue
│       │   ├── TableFooter.vue
│       │   ├── TableHead.vue
│       │   ├── TableHeader.vue
│       │   ├── TableRow.vue
│       │   └── utils.ts
│       ├── tabs
│       │   ├── index.ts
│       │   ├── Tabs.vue
│       │   ├── TabsContent.vue
│       │   ├── TabsList.vue
│       │   └── TabsTrigger.vue
│       ├── textarea
│       │   ├── index.ts
│       │   └── Textarea.vue
│       ├── toggle
│       │   ├── index.ts
│       │   └── Toggle.vue
│       └── tooltip
│           ├── index.ts
│           ├── Tooltip.vue
│           ├── TooltipContent.vue
│           ├── TooltipProvider.vue
│           └── TooltipTrigger.vue
├── components.json
├── eslint.config.mjs
├── folder-structure.md
├── layouts
│   └── default.vue
├── lib
│   └── utils.ts
├── nuxt.config.ts
├── package-lock.json
├── package.json
├── pages
│   ├── auth
│   │   ├── forgot-password.vue
│   │   ├── login.vue
│   │   └── signup.vue
│   └── index.vue
├── public
│   ├── favicon.ico
│   └── robots.txt
├── README.md
├── stylelint.config.js
├── tailwind.config.js
├── touch
└── tsconfig.json

52 directories, 258 files
